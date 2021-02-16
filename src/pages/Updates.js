import { updatesToUi, sortTimeDesc, stringToId } from '../utils/helpers';
import { LightBulbCustomSize, Header } from '../components';
import { updateStatusMap } from '../utils/constants';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import ReactTimeAgo from 'react-time-ago';
import axios from 'axios';
import { getStates } from 'ng-streets';
import '../assets/styles/updates.css';

export const Updates = () => {
  let apiUrl = '/api/updates';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:3001' + apiUrl;
  }
  const { stateId, areaId, streetId } = useParams();
  const { areas, name: stateName } = getStates().find(
    (s) => stringToId(s.name) === stateId
  );
  // TODO: Check if areas is found
  const { streets, name: areaName } = areas.find(
    (a) => stringToId(a.name) === areaId
  );
  // TODO: Check if `streets` is found
  const { name: streetName } = streets.find(
    (s) => stringToId(s.name) === streetId
  );
  // check if `streetName` is found
  const locationPath = `${stateId}/${areaId}/${streetId}`;
  const currentLocation = {
    stateName,
    areaName,
    streetName,
  };
  const [updates, setUpdates] = useState([]);
  const [getStatus, setGetStatus] = useState({
    err: false,
    isLoading: true,
  });
  const getUpdates = useCallback(() => {
    setGetStatus({ err: false, isLoading: true });
    window.scrollTo(0, 0);
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve, reject) => {
        const updates = {
          '1613402540886': {
            status: 0,
            updatedOn: 1613402540886,
          },
          '1613321522356': {
            status: 1,
            updatedOn: 1613321522356,
          },
          '1613321536822': {
            status: 1,
            updatedOn: 1613321536822,
          },
          '1613321562344': {
            status: 2,
            updatedOn: 1613321562344,
          },
          '1613321573177': {
            status: 0,
            updatedOn: 1613321573177,
          },
        };
        const uiUpdates = updatesToUi(updates, sortTimeDesc, updateStatusMap);
        window.setTimeout(() => {
          resolve(uiUpdates);
        }, 2000);
      })
        .then((updates) => {
          setUpdates(updates);
          setGetStatus({ err: false, isLoading: false });
        })
        .catch((err) => {
          setUpdates(null);
          setGetStatus({ err: true, isLoading: false });
        });
    }
    return axios
      .get(`${apiUrl}?location=${locationPath}`)
      .then(({ data: { data: updates } }) => {
        const uiUpdates = updatesToUi(updates, sortTimeDesc, updateStatusMap);
        return uiUpdates;
      })
      .then((updates) => {
        setUpdates(updates);
        setGetStatus({ err: false, isLoading: false });
      })
      .catch((err) => {
        setUpdates(null);
        setGetStatus({ err: true, isLoading: false });
      });
  }, [apiUrl, locationPath]);
  useEffect(() => {
    getUpdates();
  }, [getUpdates, setGetStatus]);

  async function postUpdate(status, locationPath, updatesToUi) {
    const updatedOn = Date.now();
    try {
      const streetUpdates = await fetch(`${apiUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          locationPath,
          status,
          updatedOn,
        }),
      });
      const { data: updates } = await streetUpdates.json();
    window.scrollTo(0, 0);

      return updatesToUi(updates, sortTimeDesc, updateStatusMap);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  function shareLatestUpdate(latestUpdate, currentLocation, shareLinkPrefix) {
    const { streetName, areaName, stateName } = currentLocation;
    const date = new Date(latestUpdate.updatedOn);
    const shareDateStr = new Intl.DateTimeFormat([], {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: true,
    }).format(date);
    const msg = `${latestUpdate.statusText} for ${streetName} inside ${areaName}, ${stateName} as at ${shareDateStr}.`;
    const url = `${window.location.href}`;
    if (shareLinkPrefix.toLowerCase().includes('twitter')) {
      window.open(
        `${shareLinkPrefix}text=${encodeURIComponent(
          msg
        )}&url=${encodeURIComponent(url)} #lightdey`,
        '_blank'
      );
    } else if (shareLinkPrefix.toLowerCase().includes("whatsapp")){
      window.open(
        `${shareLinkPrefix}text=${encodeURIComponent(
          msg
        )} ${encodeURIComponent(url)}`,
        '_blank'
      );
    } else if(shareLinkPrefix.toLowerCase().includes("facebook")){
// wont work with localhost. try https://google.com
      window.open(
        `${shareLinkPrefix}u=${encodeURIComponent(url)}&t=${encodeURIComponent(
          msg
        )} `,
        '_blank'
      );
    }
  }

  const Loading = () => (
    <div className="pb-4 bg-black flex flex-col items-center justify-center">
      <LightBulbCustomSize
        classes="h-8 w-8 fill-current text-mustard-500 loading"
        strokeWidth="1"
      />
    </div>
  );

  return (
    <div>
      <Header />
      {/*loading data*/}
      {getStatus.isLoading ? <Loading /> : null}
      {/*loading complete without error*/}
      {getStatus.isLoading === false && updates !== null ? (
        <div className="max-w-screen-xl mx-auto">
          <div className="px-5 mx-auto sm:px-12">
            <h2 className="text-center py-4 text-3xl font-medium">
              Light dey {streetName}?
            </h2>
            <div className="">
              <ul className="updates-container flex flex-col gt-phone:flex-row gt-phone:overflow-x-scroll lg:justify-between">
                {updates && updates.length ? (
                  updates.map((upd) => {
                    return (
                      <div
                        key={upd.updatedOn}
                        className="m-2 p-4 bg-black rounded-sm"
                      >
                        <li data-key={upd.updatedOn} className="">
                          <div className="flex flex-col items-center gt-phone:px-10">
                            <LightBulbCustomSize
                              classes={`h-20 w-20 fill-current ${
                                upd.status === 0 ? 'text-black' : ''
                              } ${upd.status === 1 ? 'text-mustard-400' : ''} ${
                                upd.status === 2 ? 'text-mustard-500' : ''
                              }`}
                              strokeWidth="1"
                            />
                            <p
                              className={`font-light whitespace-nowrap ${
                                upd.status === 0 ? 'text-white' : ''
                              } ${upd.status === 1 ? 'text-mustard-400' : ''} ${
                                upd.status === 2 ? 'text-mustard-500' : ''
                              }`}
                            >
                              {upd.statusText}
                            </p>
                            <p
                              className={`font-light text-sm ${
                                upd.status === 0 ? 'text-white' : ''
                              } ${upd.status === 1 ? 'text-mustard-400' : ''} ${
                                upd.status === 2 ? 'text-mustard-500' : ''
                              }`}
                            >
                              <ReactTimeAgo
                                date={upd.updatedOn}
                                locale="en-US"
                                timeStyle="twitter"
                              />{' '}

                            </p>
                          </div>
                        </li>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">Nobody don talk ontop {streetName} matter.</p>
                )}
              </ul>
            </div>

            <div className="mx-auto py-4 max-w-md ">
              <div className="ml-2 text-xl">Update the pipul</div>
              <div className="flex flex-row justify-start items-center mx-1">
                {Array.from(updateStatusMap.keys()).map((key) => {
                  return (
                    <button
                      className={`text-sm rounded-sm my-2 mx-1 gt-phone:m-2 px-4 py-2 bg-black focus:outline-none focus:ring-2 focus:ring-mustard-500  ${
                        key === 0 ? 'text-white' : ''
                      } ${key === 1 ? 'text-mustard-400' : ''} ${
                        key === 2 ? 'text-mustard-500' : ''
                      }`}
                      onClick={(e) =>
                        postUpdate(key, locationPath, updatesToUi).then(
                          setUpdates
                        )
                      }
                      key={key}
                    >
                      {updateStatusMap.get(key)}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center py-2">
                <button
                  className="text-sm rounded-sm my-2 mx-1 gt-phone:m-2 px-4 py-2 text-white bg-black focus:outline-none focus:ring-2 focus:ring-mustard-500"
                  onClick={(e) => getUpdates()}
                >
                  Refresh
                </button>
              </div>
              {getStatus.isLoading === false && updates.length === 0 ? null : (
                <div className="mx-auto pb-4 max-w-md ">
                  <div className="ml-2 text-xl">Spread the tori for</div>
                  <div className="flex flex-row justify-start items-center mx-1">
                    <button
                      onClick={(e) =>
                        shareLatestUpdate(
                          updates[0],
                          currentLocation,
                          'https://facebook.com/sharer.php?'
                        )
                      }
                     className="text-sm rounded-sm my-2 font-medium mx-1 gt-phone:m-2 px-4 py-2 text-blue-600 bg-white border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-100">
                      Facebook
                    </button>

                    <button
                      onClick={(e) =>
                        shareLatestUpdate(
                          updates[0],
                          currentLocation,
                          'whatsapp://send?'
                        )
                      }
                      className="text-sm rounded-sm my-2 font-medium mx-1 gt-phone:m-2 px-4 py-2 text-green-600 bg-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-100"
                    >
                      WhatsApp
                    </button>

                    <button
                      onClick={(e) =>
                        shareLatestUpdate(
                          updates[0],
                          currentLocation,
                          'https://twitter.com/intent/tweet?'
                        )
                      }
                      className="text-sm rounded-sm my-2 font-medium mx-1 gt-phone:m-2 px-4 py-2 text-blue-600 bg-white border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-100"
                    >
                      Twitter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

/*
status: 0
statusText: "Down NEPA"
updatedOn: 1613170344132
updatedOnText: 1613170344132
*/
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//   <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
// </svg>
