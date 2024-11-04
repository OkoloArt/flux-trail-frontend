import { DescriptionSection } from '@/features/admin-login/description-section';
import styles from './index.module.scss';

export const AdminAuthLoader = () => {
  return (
    <div className={styles.container}>
      <div className="w-[100%] max-w-[720px] p-[20px] flex flex-row items-center">
        <DescriptionSection />
      </div>
    </div>
  );
};
