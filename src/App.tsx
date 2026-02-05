
import { ConfigProvider } from './contexts/ConfigContext';
import { AppLayout } from './components/layout/AppLayout';
import { ConfigPanel } from './components/ConfigPanel/ConfigPanel';
import { ViewerContainer } from './components/Viewer/ViewerContainer';
import { ProductCatalog } from './components/Catalog/ProductCatalog';

function App() {
  return (
    <ConfigProvider>
      <AppLayout sidebar={<ConfigPanel />}>
        <div className="flex h-full w-full overflow-hidden">
          <div className="flex-1 min-w-0 relative">
            <ViewerContainer />
          </div>
          <div className="w-[350px] flex-shrink-0 h-full border-l border-gray-200 bg-white z-20 shadow-xl lg:shadow-none lg:relative absolute right-0 top-0 lg:block hidden">
            <ProductCatalog />
          </div>
          {/* Mobile Toggle for Catalog could be added here later */}
        </div>
      </AppLayout>
    </ConfigProvider>
  );
}

export default App;
