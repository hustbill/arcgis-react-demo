import { useState, useEffect } from 'react';

export function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    function handleStatusChange(friendState) {
      setIsOnline(friendState);
    }

    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    // return () => {
    //   ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    // };

    console.log("CHAT API SUBSCRIBE: ", friendID)
    if (friendID === 1) {
        handleStatusChange(true)
    } else {
        handleStatusChange(false)
    }
    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      console.log("CHAT API UNSUBSCRIBE")
    //   handleStatusChange(false)
    //   ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };

  });
  console.log('isOnline: ',  isOnline)

  return isOnline;
}