import React, { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { Download, Printer, Share2, Check } from 'lucide-react';

const InvoicePage = () => {
  const [, params] = useRoute('/invoice/:orderId');
  const orderId = params?.orderId;
  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch invoice details
    const timeout = setTimeout(() => {
      setInvoice({
        id: orderId,
        orderDate: "May 14, 2025",
        customerInfo: {
          name: "John Doe",
          email: "john.doe@example.com",
          address: "123 Main Street, Tech City, CA 90210",
          phone: "+1 (555) 123-4567"
        },
        items: [
          { 
            id: 1, 
            name: "Smart Home Hub", 
            quantity: 1, 
            price: "129.99"
          },
          { 
            id: 2, 
            name: "Wi-Fi Smart Plug (4-Pack)", 
            quantity: 2, 
            price: "59.99"
          }
        ],
        shipping: {
          method: "Standard Shipping",
          cost: 9.99,
          estimatedDelivery: "May 18-21, 2025"
        },
        payment: {
          method: "Credit Card (ending in 4242)",
          transactionId: "TXN-987654321"
        },
        subtotal: 249.97,
        shippingCost: 9.99,
        tax: 20.00,
        total: 279.96,
        status: "Paid"
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading invoice...</p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-muted-foreground">Receipt for your purchase</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="mb-8 overflow-hidden">
        <div className="bg-primary h-2"></div>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">Invoice #{invoice.id}</CardTitle>
            <p className="text-sm text-muted-foreground">Order Date: {invoice.orderDate}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">TechHub</div>
            <p className="text-sm text-muted-foreground">IoT Hardware Solutions</p>
            <p className="text-sm text-muted-foreground">support@techhub.com</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-2">Bill To:</h3>
              <p className="text-sm">{invoice.customerInfo.name}</p>
              <p className="text-sm">{invoice.customerInfo.email}</p>
              <p className="text-sm">{invoice.customerInfo.address}</p>
              <p className="text-sm">{invoice.customerInfo.phone}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Payment Status:</h3>
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 rounded-full px-3 py-1 text-sm flex items-center">
                  <Check className="h-3.5 w-3.5 mr-1" />
                  {invoice.status}
                </div>
              </div>
              <h3 className="font-medium mt-4 mb-2">Payment Method:</h3>
              <p className="text-sm">{invoice.payment.method}</p>
              <p className="text-sm text-muted-foreground">Transaction ID: {invoice.payment.transactionId}</p>
            </div>
          </div>

          <h3 className="font-medium mb-3">Order Items:</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-1 font-medium">Item</th>
                  <th className="text-center py-2 px-1 font-medium">Quantity</th>
                  <th className="text-right py-2 px-1 font-medium">Price</th>
                  <th className="text-right py-2 px-1 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-1">{item.name}</td>
                    <td className="py-3 px-1 text-center">{item.quantity}</td>
                    <td className="py-3 px-1 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-3 px-1 text-right">
                      {formatCurrency(parseFloat(item.price) * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col items-end">
            <div className="w-full sm:w-72">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Shipping:</span>
                <span>{formatCurrency(invoice.shippingCost)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Tax:</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-1 font-bold">
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start border-t">
          <div className="mt-4">
            <h3 className="font-medium mb-2">Shipping Details:</h3>
            <p className="text-sm">{invoice.shipping.method}</p>
            <p className="text-sm text-muted-foreground">Estimated Delivery: {invoice.shipping.estimatedDelivery}</p>
          </div>

          <div className="mt-6 w-full">
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground">
              <p>Thank you for your purchase!</p>
              <p>If you have any questions, please contact our customer support.</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InvoicePage;