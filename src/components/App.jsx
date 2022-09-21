import { Container } from './Container';
import { TaskPhonebook } from './TaskPhonebook';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <TaskPhonebook />
        </Container>
      </PersistGate>
    </Provider>
  );
};
