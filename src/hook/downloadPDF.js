export function downloadPDF(data, totalAmount) {
  const rows = data
    .map((sub, i) => {
      const ben = sub.beneficiary?.[0];
      return `
      <tr>
        <td>${String(i + 1).padStart(2, '0')}</td>
        <td>${ben?.beneficiary_name || '—'}</td>
        <td>₦${Number(ben?.amount || 0).toLocaleString()}</td>
        <td>${ben?.bank_name || '—'}</td>
        <td>${ben?.account_number || '—'}</td>
        <td>${ben?.vote_head || '—'}</td>
        <td>${ben?.nature_of_exp || '—'}</td>
        <td>${sub.created_at ? new Date(sub.created_at).toLocaleDateString('en-GB') : '—'}</td>
      </tr>
    `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Approved Submissions — Fummsa</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; color: #1a1915; padding: 40px; font-size: 12px; }
        .header { text-align: center; margin-bottom: 32px; border-bottom: 2px solid #c49a6c; padding-bottom: 20px; }
        .header h1 { font-size: 22px; color: #1a1915; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: #7a7060; margin-top: 6px; font-size: 11px; }
        .meta { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 11px; color: #5a5448; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        thead tr { background: #1a1915; color: #c49a6c; }
        th { padding: 10px 12px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; }
        td { padding: 9px 12px; border-bottom: 1px solid #e8e3d9; vertical-align: top; }
        tr:nth-child(even) td { background: #f9f7f4; }
        .total { text-align: right; font-size: 14px; font-weight: bold; color: #1a1915; border-top: 2px solid #c49a6c; padding-top: 12px; }
        .footer { text-align: center; margin-top: 40px; font-size: 10px; color: #9a9080; border-top: 1px solid #e8e3d9; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Federal University Fummsa</h1>
        <p>Approved Payment Submissions Report</p>
      </div>
      <div class="meta">
        <span>Generated: ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span>Total Records: ${data.length}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>S/N</th><th>Beneficiary Name</th><th>Amount</th><th>Bank</th>
            <th>Account No</th><th>Vote Head</th><th>Nature of Exp</th><th>Date</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="total">Total Amount: ₦${totalAmount.toLocaleString()}</div>
      <div class="footer">Fummsa Payment Management System — Confidential</div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 500);
}
