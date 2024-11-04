import { useAdminRouteActions } from '@/actions/admin-routes';
import { useContractActions } from '@/actions/contract-action';
import { Button } from '@/components/buttons';
import { Input } from '@/components/input';
import { PushDropdown } from '@/components/push-dropdown';
import { SideModal } from '@/components/side-modal';
import { CreateRouteContractDto, CreateRouteDto } from '@/interface/route.interface';
import { RefreshRoutesAtom } from '@/state/route.atom';
import { capitaliseText } from '@/utils/capitalise-text';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const CreateRoute = ({ visible, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const setRefreshRoutes = useSetRecoilState(RefreshRoutesAtom);
  const { createRouteContract } = useContractActions();
  const { createRoute } = useAdminRouteActions();

  const [data, setData] = useState<CreateRouteContractDto>({
    transportMedium: 'air',
    price: 0,
    from: '',
    to: '',
    fromStateCode: '',
    fromTerminal: '',
    toStateCode: '',
    toTerminal: '',
  });

  const handleChange = (key: keyof CreateRouteContractDto, value: string | number) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = Object.values(data).every((val) => !!val);

  const refreshState = () => {
    setData({
      transportMedium: 'air',
      price: 0,
      from: '',
      to: '',
      fromStateCode: '',
      fromTerminal: '',
      toStateCode: '',
      toTerminal: '',
    });
  };

  const handleCreate = async () => {
    if (loading) return;

    setLoading(true);

    let dto: CreateRouteDto;

    try {
      dto = await createRouteContract(data);
    } catch (error) {
      setLoading(false);
      toast.error(`Failed to create route contract: ${error}`);
      return;
    }

    const res = await createRoute(dto);

    if (res) {
      toast.success('Route created successfully');
      setRefreshRoutes((prev) => prev + 1);
      refreshState();
      onClose();
    }

    setLoading(false);
  };

  return (
    <SideModal isOpen={visible} onClose={loading ? () => null : onClose}>
      <div className="flex flex-col gap-10">
        <div className="font-geist text-[24px] leading-[28px] font-[700] text-[#1B1818]">
          Create new route
        </div>
        <div className="flex flex-col gap-4">
          <PushDropdown
            onChange={(val) => handleChange('transportMedium', val.split(' ')[1].toLowerCase())}
            label="Select transport type"
            data={['By Air', 'By Train', 'By Bus']}
            value={`By ${capitaliseText(data.transportMedium)}`}
          />
          <Input
            label="Departure town/city/state"
            placeholder="e.g Lagos"
            value={data.from}
            onChange={(value) => handleChange('from', value)}
          />
          <Input
            label="Departure town/city/state code"
            placeholder="e.g LOS"
            value={data.fromStateCode}
            onChange={(value) => handleChange('fromStateCode', value)}
          />
          <Input
            label="Departure terminal/park"
            placeholder="e.g. Muritala Muhammed Airport"
            value={data.fromTerminal}
            onChange={(value) => handleChange('fromTerminal', value)}
          />
          <Input
            label="Arrival town/city/state"
            placeholder="Arrival town/city/state"
            value={data.to}
            onChange={(value) => handleChange('to', value)}
          />
          <Input
            label="Arrival town/city/state code"
            placeholder="e.g ABV"
            value={data.toStateCode}
            onChange={(value) => handleChange('toStateCode', value)}
          />
          <Input
            label="Arrival terminal/park"
            placeholder="Arrival terminal/park"
            value={data.toTerminal}
            onChange={(value) => handleChange('toTerminal', value)}
          />
          <Input
            value={String(data.price)}
            label="Price"
            placeholder="Price in algos"
            type="number"
            onChange={(value) => handleChange('price', Number(value))}
          />
          <Button loading={loading} onClick={handleCreate} disabled={!canSubmit}>
            Create New Route
          </Button>
        </div>
      </div>
    </SideModal>
  );
};
