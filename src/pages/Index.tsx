
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const Index = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [loading, setLoading] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false
  });

  const handleSubmit = async (tabNumber: number) => {
    const tabKey = `tab${tabNumber}` as keyof typeof loading;
    setLoading(prev => ({ ...prev, [tabKey]: true }));
    
    try {
      // Replace with your actual endpoint URLs
      const endpoints = {
        1: 'http://localhost:9007/uat-batch-router',
        2: 'http://localhost:9007/job-stat-hierarchy',
        3: 'http://localhost:9007/your-endpoint-3',
        4: 'http://localhost:9007/your-endpoint-4'
      };
      
      const response = await fetch(endpoints[tabNumber as keyof typeof endpoints]);
      const result = await response.json();
      
      // Update the appropriate state based on tab number
      if (tabNumber === 1) setData1(Array.isArray(result) ? result : [result]);
      if (tabNumber === 2) setData2(Array.isArray(result) ? result : [result]);
      if (tabNumber === 3) setData3(Array.isArray(result) ? result : [result]);
      if (tabNumber === 4) setData4(Array.isArray(result) ? result : [result]);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(prev => ({ ...prev, [tabKey]: false }));
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusText = (statusId: number) => {
    const statusMap: { [key: number]: string } = {
      1: 'Pending',
      2: 'Running',
      3: 'Completed',
      4: 'Failed',
      5: 'Cancelled'
    };
    return statusMap[statusId] || `Status ${statusId}`;
  };

  const DataTable = ({ data }: { data: any[] }) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No data available. Click Submit to fetch data.
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Duration (s)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {Object.keys(item)[0] || 'Unknown Job'}
              </TableCell>
              <TableCell>{formatDateTime(item.start_time)}</TableCell>
              <TableCell>{formatDateTime(item.end_time)}</TableCell>
              <TableCell>{item.duration || 'N/A'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status_id === 3 ? 'bg-green-100 text-green-800' :
                  item.status_id === 4 ? 'bg-red-100 text-red-800' :
                  item.status_id === 2 ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getStatusText(item.status_id)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">API Data Visualizer</h1>
        
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tab1">Batch Router</TabsTrigger>
            <TabsTrigger value="tab2">Job Hierarchy</TabsTrigger>
            <TabsTrigger value="tab3">Endpoint 3</TabsTrigger>
            <TabsTrigger value="tab4">Endpoint 4</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tab1" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Batch Router Data</h2>
                <Button 
                  onClick={() => handleSubmit(1)}
                  disabled={loading.tab1}
                >
                  {loading.tab1 ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={data1} />
            </div>
          </TabsContent>
          
          <TabsContent value="tab2" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Job Hierarchy Data</h2>
                <Button 
                  onClick={() => handleSubmit(2)}
                  disabled={loading.tab2}
                >
                  {loading.tab2 ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={data2} />
            </div>
          </TabsContent>
          
          <TabsContent value="tab3" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Endpoint 3 Data</h2>
                <Button 
                  onClick={() => handleSubmit(3)}
                  disabled={loading.tab3}
                >
                  {loading.tab3 ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={data3} />
            </div>
          </TabsContent>
          
          <TabsContent value="tab4" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Endpoint 4 Data</h2>
                <Button 
                  onClick={() => handleSubmit(4)}
                  disabled={loading.tab4}
                >
                  {loading.tab4 ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={data4} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
