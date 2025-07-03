
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">API Data Visualizer</h1>
        
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tab1">Endpoint 1</TabsTrigger>
            <TabsTrigger value="tab2">Endpoint 2</TabsTrigger>
            <TabsTrigger value="tab3">Endpoint 3</TabsTrigger>
            <TabsTrigger value="tab4">Endpoint 4</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tab1" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Endpoint 1 Data</h2>
              <div className="text-gray-600">
                <p>Data from your first endpoint will be displayed here.</p>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <pre className="text-sm">
                    {`// Example structure:
{
  "data": [...],
  "status": "success"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tab2" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Endpoint 2 Data</h2>
              <div className="text-gray-600">
                <p>Data from your second endpoint will be displayed here.</p>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <pre className="text-sm">
                    {`// Example structure:
{
  "data": [...],
  "status": "success"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tab3" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Endpoint 3 Data</h2>
              <div className="text-gray-600">
                <p>Data from your third endpoint will be displayed here.</p>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <pre className="text-sm">
                    {`// Example structure:
{
  "data": [...],
  "status": "success"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tab4" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Endpoint 4 Data</h2>
              <div className="text-gray-600">
                <p>Data from your fourth endpoint will be displayed here.</p>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <pre className="text-sm">
                    {`// Example structure:
{
  "data": [...],
  "status": "success"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
