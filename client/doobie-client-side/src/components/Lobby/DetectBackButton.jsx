import { useEffect } from 'react';



// function DetectBackButton() {



//     console.log(history)
//   // listen for changes to the history
//   useEffect(() => {
//     const unlisten = history.listen((location, action) => {
//       if (action === 'POP') {
//         // the user went back
//         console.log('User went back');
//       }
//     });

//     // cleanup the listener when the component unmounts
//     return () => unlisten();
//   }, [history]);

//   return (
//     // your component code
//     null
//   );
// }

// export default DetectBackButton;