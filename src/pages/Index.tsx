
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const Index = () => {
  const [batchData, setBatchData] = useState([]);
  const [autosysData, setAutosysData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState({
    batch: false,
    autosys: false,
    business: false
  });

  const handleSubmit = async (tabType: string) => {
    const tabKey = tabType as keyof typeof loading;
    setLoading(prev => ({ ...prev, [tabKey]: true }));
    
    try {
      // Replace with your actual endpoint URLs
      const endpoints = {
        batch: 'http://localhost:9007/batch-insights',
        autosys: 'http://localhost:9007/autosys-insights',
        business: 'http://localhost:9007/business-insights'
      };
      
      const response = await fetch(endpoints[tabType as keyof typeof endpoints]);
      const result = await response.json();
      
      // Update the appropriate state based on tab type
      if (tabType === 'batch') setBatchData(Array.isArray(result) ? result : [result]);
      if (tabType === 'autosys') setAutosysData(Array.isArray(result) ? result : [result]);
      if (tabType === 'business') setBusinessData(Array.isArray(result) ? result : [result]);
      
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
        <h1 className="text-3xl font-bold mb-8 text-center">Job Processing Dashboard</h1>
        
        <Tabs defaultValue="batch" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="batch">Batch Insights</TabsTrigger>
            <TabsTrigger value="autosys">Autosys Insights</TabsTrigger>
            <TabsTrigger value="business">Business Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batch" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Batch Processing Insights</h2>
                <Button 
                  onClick={() => handleSubmit('batch')}
                  disabled={loading.batch}
                >
                  {loading.batch ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={batchData} />
            </div>
          </TabsContent>
          
          <TabsContent value="autosys" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Autosys Job Insights</h2>
                <Button 
                  onClick={() => handleSubmit('autosys')}
                  disabled={loading.autosys}
                >
                  {loading.autosys ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={autosysData} />
            </div>
          </TabsContent>
          
          <TabsContent value="business" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Business Process Insights</h2>
                <Button 
                  onClick={() => handleSubmit('business')}
                  disabled={loading.business}
                >
                  {loading.business ? 'Loading...' : 'Submit'}
                </Button>
              </div>
              <DataTable data={businessData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
