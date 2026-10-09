import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { ApplicationsProvider } from '../../context/ApplicationsContext';
import { InterviewsProvider } from '../../context/InterviewsContext';

function AppLayout() {
  return (
    <ApplicationsProvider>
      <InterviewsProvider>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4 flex-1">
              <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
                <Outlet />
              </Suspense>
            </main>
          </div>
        </div>
      </InterviewsProvider>
    </ApplicationsProvider>
  );
}

export default AppLayout;