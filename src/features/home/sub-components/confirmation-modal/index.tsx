import { SideModal } from '@/components/side-modal';
import { useState } from 'react';
import { Overview } from './overview';
import { Loading } from './loading';
import { ErrorView } from './error';
import { SuccessView } from './success';
import { IRoute } from '@/interface/route.interface';
import { IPassengers, Ticket } from '@/interface/ticket.interface';
import { useTicketActions } from '@/actions/tickets';
import { useContractActions } from '@/actions/contract-action';
import toast from 'react-hot-toast';
import { DetailsToImagify } from './details-to-imagify';
import { pinata } from '@/config/config';
import html2canvas from 'html2canvas';
import { useWallet } from '@txnlab/use-wallet';

interface Props {
  onClose: () => void;
  data: {
    route: IRoute;
    departureDate: string;
    passengers: IPassengers;
  };
}
export const ConfirmationModal = ({ onClose, data }: Props) => {
  const [view, setView] = useState<'overview' | 'loading' | 'success' | 'error'>('overview');
  const { activeAddress } = useWallet();
  const [ticket, setTicket] = useState<Ticket>();
  const { createTicket } = useTicketActions();
  const { optInToApplication, mintTicketAsa, claimTicketAsa } = useContractActions();

  const numberOfPassengers = Object.keys(data.passengers).reduce(
    (acc, k) => acc + (data.passengers as any)[k],
    0,
  );

  const onCreateNFTImage = async () => {
    const doc = document.getElementById('details-to-imagify');
    const holder = document.getElementById('image-holder');

    if (!doc || !holder) {
      toast.error('No doc');
      return;
    }

    const newDoc = document.createElement('div');
    newDoc.innerHTML = doc.innerHTML;
    holder.appendChild(newDoc);
    holder.style.width = '528px';
    setView('loading');
    const canvas = await html2canvas(newDoc, { scale: 2 });

    canvas.toBlob(async (blob) => {
      const fileName = `${data.route.from}-to-${data.route.to}-${Date.now()}`;
      const file = new File([blob as BlobPart], fileName, {
        type: 'image/png',
      });

      if (!file) {
        toast.error('Failed to create NFT image file');
        return;
      }

      try {
        const keyRequest = await fetch('/api/key');
        const keyData = await keyRequest.json();
        const upload = await pinata.upload.file(file).key(keyData.JWT);

        const metadata = {
          name: `${data.route.from} to ${data.route.to}`,
          description: `A ticket that gives access to transport services from ${data.route.from} to ${data.route.to} by ${data.route.transportMedium}`,
          image: `ipfs://${upload.IpfsHash}`,
          image_mimetype: `/image/png`,
          external_url: 'https://flux-trail.vercel.app',
          properties: {
            file_url: fileName,
            file_url_mimetype: `/image/png`,
            external_url: 'https://flux-trail.vercel.app',
            initially_created_for: activeAddress!,
            number_of_passengers: numberOfPassengers,
            creation_date: new Date(Date.now()).toLocaleString(),
            requested_departure_date: new Date(data.departureDate).toDateString(),
          },
        };

        const resultMeta = await pinata.upload.json(metadata).key(keyData.JWT);
        const ipfsUrl = 'ipfs://' + resultMeta.IpfsHash;

        if (ipfsUrl) {
          onSubmit(ipfsUrl);
        } else {
          toast.error('Failed to create NFT image');
          setView('overview');
        }
      } catch (error) {
        toast.error(`Failed to create NFT image: ${error}`);
        setView('overview');
      }
    });

    holder.removeChild(newDoc);
    holder.style.width = '100%';
  };

  const onSubmit = async (ipfsUrl: string) => {
    setView('loading');

    let assetId: number;
    let buyerAddress: string;

    try {
      toast.loading('Opting in to application...');
      await optInToApplication(data.route.appId);
    } catch (error) {
      toast.dismiss();
      toast.success('Opted in to application already');
    }

    toast.dismiss();
    toast.loading('Minting ticket ASA...');

    try {
      const res = await mintTicketAsa({
        routeId: data.route.id,
        appId: data.route.appId,
        price: data.route.price,
        numberOfTickets: numberOfPassengers,
        ipfsUrl,
      });
      buyerAddress = res.buyerAddress;

      toast.dismiss();
      toast.success('Ticket minted successfully');
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to mint ticket ASA: ${error}`);
      setView('overview');
      return;
    }

    toast.loading('Claiming ticket ASA...');

    try {
      const res = (await claimTicketAsa(data.route.appId))!;
      assetId = res.assetId;
      toast.dismiss();
      toast.success('Ticket claimed successfully');
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to claim ticket ASA: ${error}`);
      setView('overview');
      return;
    }

    toast.loading('Uploading info...');

    const response = await createTicket({
      assetId,
      buyerAddress,
      routeId: data.route.id,
      departureDate: data.departureDate,
      numberOfAdults: data.passengers.adult,
      numberOfChildren: data.passengers.child,
      numberOfInfants: data.passengers.infant,
      ipfsUrl,
    });

    toast.dismiss();

    if (response) {
      setTicket(response);
      setView('success');
    } else {
      setView('overview');
    }
  };

  return (
    <SideModal
      isOpen
      onClose={() => {
        onClose();
      }}
    >
      {view === 'overview' && <Overview data={data} handleNext={() => onCreateNFTImage()} />}
      {view === 'loading' && <Loading />}
      {view === 'error' && <ErrorView onReturn={() => setView('overview')} />}
      {view === 'success' && !!ticket && <SuccessView data={ticket} onClose={onClose} />}
      <div className="hidden">
        <DetailsToImagify
          ticket={{
            routeId: data.route.id,
            departureDate: data.departureDate,
            numberOfAdults: data.passengers.adult,
            numberOfChildren: data.passengers.child,
            numberOfInfants: data.passengers.infant,
            fromStateCode: data.route.fromStateCode,
            toStateCode: data.route.toStateCode,
            fromTerminal: data.route.fromTerminal,
            toTerminal: data.route.toTerminal,
            transportMedium: data.route.transportMedium,
            price: data.route.price,
            from: data.route.from,
            to: data.route.to,
          }}
        />
      </div>
      <div className="absolute right-[-1000px] top-[-1000px]" id="image-holder"></div>
    </SideModal>
  );
};
