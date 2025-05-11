import toast, { Toast, ToastPosition } from 'react-hot-toast';

const showToast = (type = 'default', message: string, options: Partial<Pick<Toast, 'style' | 'className' | 'id' | 'duration' | 'position' | 'icon' | 'ariaProps' | 'iconTheme' | 'removeDelay'>> = {}) => {
  const baseOptions = { position: 'top-right' as ToastPosition, duration: 5000, ...options };

  switch (type) {
    case 'success':
      toast.success(message, baseOptions);
      break;
    case 'error':
      toast.error(message, baseOptions);
      break;
    case 'loading':
      toast.loading(message, baseOptions);
      break;
    case 'custom':
      toast(message, baseOptions);
      break;
    default:
      toast(message, baseOptions);
  }
};

export default showToast;
