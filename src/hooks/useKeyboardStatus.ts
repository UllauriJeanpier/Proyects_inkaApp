import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsOpen(true)
    );
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsOpen(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  });

  return isOpen;
};

export default useKeyboardStatus;
