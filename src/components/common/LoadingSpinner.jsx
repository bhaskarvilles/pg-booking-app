import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <div className="spinner-wrapper">
      <Spinner animation="grow" className="spinner-grow spinner-1" />
      <Spinner animation="grow" className="spinner-grow spinner-2" />
      <Spinner animation="grow" className="spinner-grow spinner-3" />
    </div>
  );
} 