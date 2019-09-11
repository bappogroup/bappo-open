import React from 'react';
import { Pdf, View } from 'bappo-components';
import { Code } from '../../../../ui-explorer';

const httpUrl =
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
const definition = {
  content: [
    'Document created from definition',
    {
      layout: 'exampleLayout',
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 100, '*'],

        body: [
          ['First', 'Second', 'Third', 'The last one'],
          ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
          [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
        ],
      },
    },
  ],
  info: {
    title: 'Document created from definition',
  },
};
const tableLayouts = {
  exampleLayout: {
    hLineWidth: (i, node) => {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: i => {
      return 0;
    },
    hLineColor: i => {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: i => {
      return i === 0 ? 0 : 8;
    },
    paddingRight: (i, node) => {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
  },
};

const PdfPropSourceExample = () => {
  return (
    <View>
      <Code>{`source={{ uri: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf' }}`}</Code>
      <Pdf
        source={{
          uri: httpUrl,
        }}
        style={styles.pdf}
      />
      <Code>{`source={{ uri: 'data:application/pdf;base64,xxx' }}`}</Code>
      <Pdf
        source={{
          uri:
            'data:application/pdf;base64,JVBERi0xLjMKJf////8KOCAwIG9iago8PAovVHlwZSAvRXh0R1N0YXRlCi9jYSAxCi9DQSAxCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL01lZGlhQm94IFswIDAgNTk1LjI4IDg0MS44OV0KL0NvbnRlbnRzIDUgMCBSCi9SZXNvdXJjZXMgNiAwIFIKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1Byb2NTZXQgWy9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUldCi9FeHRHU3RhdGUgPDwKL0dzMSA4IDAgUgo+PgovRm9udCA8PAovRjEgOSAwIFIKPj4KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0xlbmd0aCAxNDcKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnictc2xCgIxDAbgPU+RF7DXtGnawnHDoR64Kd3EqVzFQUEKPr9FXARvUwIh/CT5CHWrFbUWmFSImK/QTZXwXKFbz49Lng/TiLmCfq3WfIMCd6Bvh2N654Ss0UerjGdM7eOWkAymAsfe8dBmjb04bz0bPaA+YdrBJsH+J7Y4Zaws+cJSxP6BDV5FWmQtfYBPFfhSKgplbmRzdHJlYW0KZW5kb2JqCjExIDAgb2JqCihwZGZtYWtlKQplbmRvYmoKMTIgMCBvYmoKKHBkZm1ha2UpCmVuZG9iagoxMyAwIG9iagooRDoyMDE5MDcwNTAxNDA0NVopCmVuZG9iagoxNCAwIG9iagoodGVzdDEucGRmKQplbmRvYmoKMTAgMCBvYmoKPDwKL1Byb2R1Y2VyIDExIDAgUgovQ3JlYXRvciAxMiAwIFIKL0NyZWF0aW9uRGF0ZSAxMyAwIFIKL1RpdGxlIDE0IDAgUgo+PgplbmRvYmoKOSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCjQgMCBvYmoKPDwKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCi9OYW1lcyAyIDAgUgo+PgplbmRvYmoKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzcgMCBSXQo+PgplbmRvYmoKMiAwIG9iago8PAovRGVzdHMgPDwKICAvTmFtZXMgWwpdCj4+Cj4+CmVuZG9iagp4cmVmCjAgMTUKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwODk3IDAwMDAwIG4gCjAwMDAwMDA5NTQgMDAwMDAgbiAKMDAwMDAwMDgzNSAwMDAwMCBuIAowMDAwMDAwODE0IDAwMDAwIG4gCjAwMDAwMDAyOTIgMDAwMDAgbiAKMDAwMDAwMDE3NSAwMDAwMCBuIAowMDAwMDAwMDY1IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDcxNyAwMDAwMCBuIAowMDAwMDAwNjI3IDAwMDAwIG4gCjAwMDAwMDA1MTEgMDAwMDAgbiAKMDAwMDAwMDUzNyAwMDAwMCBuIAowMDAwMDAwNTYzIDAwMDAwIG4gCjAwMDAwMDA1OTkgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAxNQovUm9vdCAzIDAgUgovSW5mbyAxMCAwIFIKL0lEIFs8ZjM5ZTY2OWE3MzlkMWU0MmI1YjJmNDU0Zjk5NDRiZmI+IDxmMzllNjY5YTczOWQxZTQyYjViMmY0NTRmOTk0NGJmYj5dCj4+CnN0YXJ0eHJlZgoxMDAxCiUlRU9GCg==',
        }}
        style={styles.pdf}
      />
      <Code>{`source={
  definition: {
    content: [
      'Document created from definition',
      {
        layout: "exampleLayout",
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 100, '*'],
  
          body: [
            ['First', 'Second', 'Third', 'The last one'],
            ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
            [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          ],
        },
      },
    ],
    info: {
      title: 'Document created from definition'
    }
  },
  tableLayouts: {
    exampleLayout: {
      hLineWidth: (i, node) => {
        if (i === 0 || i === node.table.body.length) {
          return 0;
        }
        return i === node.table.headerRows ? 2 : 1;
      },
      vLineWidth: i => {
        return 0;
      },
      hLineColor: i => {
        return i === 1 ? 'black' : '#aaa';
      },
      paddingLeft: i => {
        return i === 0 ? 0 : 8;
      },
      paddingRight: (i, node) => {
        return i === node.table.widths.length - 1 ? 0 : 8;
      },
    },
  }
}`}</Code>
      <Pdf
        source={{
          definition,
          tableLayouts,
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfPropSourceExample;

const styles = {
  pdf: {
    height: 480,
    margin: 8,
  },
};
