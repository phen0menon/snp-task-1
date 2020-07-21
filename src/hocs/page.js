import { useEffect } from 'react';

const Page = ({ title, children }) => {
  useEffect(() => {
    document.title = title || 'Application';
  }, [title]);
  return children;
};

export default Page;
