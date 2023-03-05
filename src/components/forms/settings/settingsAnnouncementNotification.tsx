import { api } from '@utils/api';
import type { FC } from 'react';
import { useState } from 'react';

const SettingsAnnouncementNotification: FC<{
  defaultValue: boolean;
}> = ({ defaultValue = true }) => {
  const [announcementState, setAnnouncementState] = useState(defaultValue);
  const [updatingState, setUpdatingState] = useState(false);
  const announcementQuery = api.settings.changeOfficialNews.useMutation();

  const handleChangeAnnounceSetting = async () => {
    if (!updatingState) {
      setUpdatingState((prev) => !prev);
      setAnnouncementState((prev) => !prev);
      await announcementQuery.mutateAsync({ target: !announcementState });
      setUpdatingState((prev) => !prev);
    }
  };

  return (
    <>
      <span>Announcement Notification</span>
      <span className='flex flex-grow justify-end pr-4'>
        <div className='flex'>
          <label className='relative inline-flex cursor-pointer items-center'>
            <input
              type='checkbox'
              className='peer sr-only'
              checked={announcementState}
              readOnly
            />
            <div
              onClick={handleChangeAnnounceSetting}
              className="peer h-5 w-10 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[4px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-themePrimary-50 after:transition-all after:content-[''] peer-checked:bg-themePrimary-400 peer-checked:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-themePrimary-400"></div>
          </label>
        </div>
      </span>
    </>
  );
};

export default SettingsAnnouncementNotification;
