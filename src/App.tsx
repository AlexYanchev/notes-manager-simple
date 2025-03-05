import React from 'react';
import NotesManager from './components/NotesManager/NotesManager';
import { Provider } from 'react-redux';
import { storeNotesManager } from './redux/store';
import StorageProvider from './contexts/StorageProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './TEST/paramEditor/Main';

function App() {
  return <Main />;
}
// function App() {
//   return (
//     <Provider store={storeNotesManager}>
//       <StorageProvider>
//         <DndProvider backend={HTML5Backend}>
//           <NotesManager />
//         </DndProvider>
//       </StorageProvider>
//     </Provider>
//   );
// }

export default App;
