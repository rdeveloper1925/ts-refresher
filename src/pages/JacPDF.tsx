import React, { useMemo } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  usePDF,
} from '@react-pdf/renderer';

/*
  InvoicePDF+Preview.jsx

  Exports default <Invoice /> component that renders:
  - an HTML preview styled with TailwindCSS that visually matches the PDF
  - a PDF generated on-the-fly using @react-pdf/renderer

  Usage:
    <Invoice data={invoiceData} preview />

  Notes:
  - The original uploaded PDF is available at the local path:
    /mnt/data/Tax Invoice-14502-2025-11-24.pdf
    (you can use this path if you want to show a "Download original" link).
  - This file contains a complete example of the PDF layout and an HTML
    preview that follows the same structure and styles.
*/

// ---------- Styles for react-pdf ----------
const pdfStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  companyBlock: {
    flexDirection: 'column',
    maxWidth: '60%',
  },
  invoiceMeta: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  small: { fontSize: 9 },

  // Table
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  tableRow: {
    flexDirection: 'row',
  },
  colSn: { width: '6%', padding: 6, borderRightWidth: 1, borderRightColor: '#000' },
  colDesc: { width: '54%', padding: 6, borderRightWidth: 1, borderRightColor: '#000' },
  colQty: { width: '14%', padding: 6, borderRightWidth: 1, borderRightColor: '#000', textAlign: 'right' },
  colRate: { width: '13%', padding: 6, borderRightWidth: 1, borderRightColor: '#000', textAlign: 'right' },
  colAmount: { width: '13%', padding: 6, textAlign: 'right' },

  totals: {
    marginTop: 8,
    alignSelf: 'flex-end',
    width: '40%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  signature: { marginTop: 24, textAlign: 'center' },
});

// ---------- PDF Document component ----------
const PdfInvoice = () => {
    const data = {
        company: {
            name: 'JAPAN AUTO CARE LTD',
            addressLine1: 'Plot No. 1105, Musajjalumbwa Road',
            addressLine2: 'P. O. BOX 33246, Kampala Uganda',
            phone: '0392-940769',
            email: 'jacltdgarage@gmail.com',
            tin: '1000076645',
        },
        meta: {
            invoiceNo: '14502',
            date: '24/Nov/2025',
            lpoNo: '11456',
            modeOfPayment: 'EFT',
            mileage: '0',
        },
        customer: {
            name: 'PARLIAMENTARY COMMISSION',
            address: 'PO BOX 7178 KAMPALA',
            email: 'pkasudha@parliament.go.ug',
            phone: '+256702684858',
        },
        items: [
            { description: 'Rear brake wheel cylinders (Set)', quantity: '1', rate: 658200, amount: 658200 },
            { description: 'Brake fluid (Tins)', quantity: '5', rate: 20000, amount: 100000 },
            { description: 'Front Wheel hub bearings (Set)', quantity: '1', rate: 854100, amount: 854100 },
            { description: 'Grease (Kgs)', quantity: '2', rate: 25000, amount: 50000 },
            { description: 'Labour (L/sum)', quantity: '1', rate: 350000, amount: 350000 },
        ],
        subtotal: 2012300,
        vatRate: 18,
        vat: 362214,
        rounding: 0,
        grandTotal: 2374514,
    };
    return (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <View style={pdfStyles.brandRow}>
          <View style={pdfStyles.companyBlock}>
            <Text style={pdfStyles.title}>{data.company.name}</Text>
            <Text style={pdfStyles.small}>{data.company.addressLine1}</Text>
            <Text style={pdfStyles.small}>{data.company.addressLine2}</Text>
            <Text style={pdfStyles.small}>Tel: {data.company.phone}</Text>
            <Text style={pdfStyles.small}>Email: {data.company.email}</Text>
          </View>

          <View style={pdfStyles.invoiceMeta}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>TAX INVOICE</Text>
            <Text style={pdfStyles.small}>INVOICE NO.: {data.meta.invoiceNo}</Text>
            <Text style={pdfStyles.small}>DATE: {data.meta.date}</Text>
            <Text style={pdfStyles.small}>TIN NO.: {data.company.tin}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
          <View style={{ width: '60%' }}>
            <Text style={{ fontWeight: 'bold' }}>BILL TO</Text>
            <Text style={pdfStyles.small}>{data.customer.name}</Text>
            <Text style={pdfStyles.small}>{data.customer.address}</Text>
            <Text style={pdfStyles.small}>{data.customer.email}</Text>
            <Text style={pdfStyles.small}>{data.customer.phone}</Text>
          </View>

          <View style={{ width: '35%' }}>
            <Text style={pdfStyles.small}>LPO NO.: {data.meta.lpoNo}</Text>
            <Text style={pdfStyles.small}>MODE OF PAYMENT: {data.meta.modeOfPayment}</Text>
            <Text style={pdfStyles.small}>MILEAGE: {data.meta.mileage}</Text>
          </View>
        </View>
      </View>

      {/* Table */}
      <View style={pdfStyles.table}>
        <View style={[pdfStyles.tableHeader, pdfStyles.tableRow]}>
          <View style={pdfStyles.colSn}><Text style={pdfStyles.small}>Sn.</Text></View>
          <View style={pdfStyles.colDesc}><Text style={pdfStyles.small}>Description</Text></View>
          <View style={pdfStyles.colQty}><Text style={pdfStyles.small}>Quantity</Text></View>
          <View style={pdfStyles.colRate}><Text style={pdfStyles.small}>Rate</Text></View>
          <View style={pdfStyles.colAmount}><Text style={pdfStyles.small}>Amount</Text></View>
        </View>

        {data.items.map((it, idx) => (
          <View key={idx} style={pdfStyles.tableRow}>
            <View style={pdfStyles.colSn}><Text>{idx + 1}</Text></View>
            <View style={pdfStyles.colDesc}><Text>{it.description}</Text></View>
            <View style={pdfStyles.colQty}><Text>{it.quantity}</Text></View>
            <View style={pdfStyles.colRate}><Text>{formatCurrency(it.rate)}</Text></View>
            <View style={pdfStyles.colAmount}><Text>{formatCurrency(it.amount)}</Text></View>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={pdfStyles.totals}>
        <View style={pdfStyles.totalsRow}><Text>SUBTOTAL:</Text><Text>{formatCurrency(data.subtotal)}</Text></View>
        <View style={pdfStyles.totalsRow}><Text>ADD: VAT {data.vatRate}%:</Text><Text>{formatCurrency(data.vat)}</Text></View>
        <View style={pdfStyles.totalsRow}><Text>ROUNDING:</Text><Text>{formatCurrency(data.rounding)}</Text></View>
        <View style={[pdfStyles.totalsRow, { fontWeight: 'bold' }]}><Text>GRAND TOTAL:</Text><Text>{formatCurrency(data.grandTotal)}</Text></View>
      </View>

      <View style={pdfStyles.signature}>
        <Text>Sales Person Signature</Text>
        <Text>_______________________</Text>
      </View>
    </Page>
  </Document>
)}


// ---------- Utilities ----------
function formatCurrency(n: number) {
  if (n == null) return '';
  // Basic formatting, replace with Intl.NumberFormat if desired
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 2 }).format(n);
}

// ---------- HTML preview styles (Tailwind classes) ----------
// The HTML preview intentionally mimics the PDF layout using Tailwind utility classes.
// You can adapt class names to your project's setup. If you don't use Tailwind,
// convert these into CSS modules or inline styles.

// ---------- Main exported component ----------
export default function JacPDF() {
  
  // updateInstance() will regenerate PDF if you need to force it when data changes

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold">Invoice Preview</h2>
        <div className="flex gap-2">
          <PDFDownloadLink document={<PdfInvoice />} fileName={`invoice-today.pdf`}>
            {({ blob, url, loading, error }) => (
              <button className="px-3 py-1 border rounded bg-white">{loading ? 'Preparing...' : 'Download PDF'}</button>
            )}
          </PDFDownloadLink>

          
        </div>
      </div>
    </div>
  );
}
