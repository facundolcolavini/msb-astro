import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Spinner from './Spinner';
import ListResultsSkeleton from './Skeletons/ListResultsSkeleton';

interface Props {
  children: any;
  loader: string;
}

function LoadingContent({ children, loader }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  ;
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [children]);

  const renderLoader = () => {
    switch (loader) {
      case 'Spinner':
        return <Spinner />;
      case 'ListResultsSkeleton':
        return <ListResultsSkeleton  />;
      default:
        return null;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div id="loader" className="animate-fadeIn flex justify-center items-center h-100">
          {renderLoader()}
        </div>
      ) : (
        <div id="content" className="animate-fade">
          {children}
        </div>
      )}
    </div>
  );
}

export default LoadingContent;
