import { useState } from 'react';

function ContentCard({ predictions }) {
  const [activeTab, setActiveTab] = useState('predictions');

  return (
    <div className='w-full md:max-w-xl lg:max-w-2xl overflow-hidden'>
      <div className='flex mb-2'>
        <button
          className='button-ghost'
          onClick={() => setActiveTab('predictions')}
        >
          Predictions
        </button>
        <button className='button-ghost' onClick={() => setActiveTab('badges')}>
          Badges
        </button>
      </div>
      {/* Predictions */}
      {activeTab === 'predictions' && (
        <div
          id='predictions'
          className='w-full bg-card shadow-lg rounded-lg overflow-hidden p-4 dark:bg-darkCard'
        >
          <h2 className='card-header text-primaryText dark:text-darkPrimaryText'>
            Predictions
          </h2>
          {/* Mapping predictions */}
          {predictions.map((prediction) => (
            <div key={prediction.id} className='card-content'>
              {/* Prediction */}
              <p className='text-primaryText dark:text-darkPrimaryText'>
                {prediction.prediction}
              </p>
              {/* Vote Until */}
              <div className='flex items-center text-sm text-secondaryText dark:text-darkSecondaryText mt-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
                  />
                </svg>
                <span className='ml-2 text-xs'>
                  Vote until: {prediction.lastVoteDate}
                </span>
              </div>
              {/* Agree */}
              <div className='flex mt-1'>
                <div className='flex items-center text-sm text-primaryText dark:text-darkPrimaryText mt-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4 mr-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                    />
                  </svg>

                  <span>{prediction.agrees} Agree</span>
                </div>
                <div className='flex items-center text-sm text-primaryText dark:text-darkPrimaryText mt-1 ml-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4 mr-1'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54'
                    />
                  </svg>

                  <span>{prediction.disagrees} Disagree</span>
                </div>
                <div className='flex items-center text-sm text-primaryText dark:text-darkPrimaryText mt-1 ml-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z'
                    />
                  </svg>
                  <span>{prediction.comments.length} Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Badges */}
      {activeTab === 'badges' && (
        <div
          id='badges'
          className='w-full bg-card dark:bg-darkCard shadow-lg rounded-lg overflow-hidden p-4'
        >
          <h2 className='card-header'>Badges</h2>
        </div>
      )}
    </div>
  );
}
export default ContentCard;
