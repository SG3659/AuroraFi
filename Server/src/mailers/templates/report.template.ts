
import type { ReportType } from "../../@types/report.type.js";
import { formatCurrency } from "../../utils/format-currency.js";
import { capitalizeFirstLetter } from "../../utils/helper.js";

export const getReportEmailTemplate = (
  reportData: ReportType & { username: string },
  frequency: string
) => {
  const {
    username,
    period,
    totalIncome,
    totalExpenses,
    availableBalance,
    savingsRate,
    topSpendingCategories,
    insights,
  } = reportData;

  const reportTitle = `${capitalizeFirstLetter(frequency)} Report`;

  const categoryList = topSpendingCategories
    .map(
      (cat: any) => `<li>
      ${cat.name} - ${formatCurrency(cat.amount)} (${cat.percent}%)
      </li>
    `
    )
    .join("");

  const insightsList = insights
    .map((insight: string) => `<li>${insight}</li>`)
    .join("");

  const currentYear = new Date().getFullYear();
  return `
  <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <title>${reportTitle}</title>
     <!-- Google Fonts Link -->
     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
   </head>
  <body style="margin:0; padding:0; font-family:'Roboto', Arial, sans-serif; background-color:#f4f6f9; font-size:16px; color:#333;">
  <table cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f6f9; padding:30px 15px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00bc7d,#00a86b); padding:30px; text-align:center; color:#ffffff;">
              <h2 style="margin:0; font-size:24px; font-weight:600;">
                ${reportTitle}
              </h2>
              <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
                Financial Summary for ${period}
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:30px 30px 10px;">
              <p style="margin:0 0 8px;">Hi <strong>${username}</strong>,</p>
              <p style="margin:0; color:#666;">
                Here's a snapshot of your financial activity.
              </p>
            </td>
          </tr>

          <!-- Metrics Cards -->
          <tr>
            <td style="padding:20px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td width="50%" style="padding:10px;">
                    <div style="background:#f1fff9; border-radius:10px; padding:15px;">
                      <p style="margin:0; font-size:13px; color:#00a86b;">Total Income</p>
                      <p style="margin:5px 0 0; font-size:18px; font-weight:bold; color:#00a86b;">
                        ${formatCurrency(totalIncome)}
                      </p>
                    </div>
                  </td>

                  <td width="50%" style="padding:10px;">
                    <div style="background:#fff5f5; border-radius:10px; padding:15px;">
                      <p style="margin:0; font-size:13px; color:#e53935;">Total Expenses</p>
                      <p style="margin:5px 0 0; font-size:18px; font-weight:bold; color:#e53935;">
                        ${formatCurrency(totalExpenses)}
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td width="50%" style="padding:10px;">
                    <div style="background:#f0f4ff; border-radius:10px; padding:15px;">
                      <p style="margin:0; font-size:13px; color:#3f51b5;">Available Balance</p>
                      <p style="margin:5px 0 0; font-size:18px; font-weight:bold; color:#3f51b5;">
                        ${formatCurrency(availableBalance)}
                      </p>
                    </div>
                  </td>

                  <td width="50%" style="padding:10px;">
                    <div style="background:#faf5ff; border-radius:10px; padding:15px;">
                      <p style="margin:0; font-size:13px; color:#8e24aa;">Savings Rate</p>
                      <p style="margin:5px 0 0; font-size:18px; font-weight:bold; color:#8e24aa;">
                        ${savingsRate.toFixed(2)}%
                      </p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 30px;">
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>

          <!-- Top Categories -->
          <tr>
            <td style="padding:20px 30px;">
              <h4 style="margin:0 0 10px; font-size:16px;">Top Spending Categories</h4>
              <ul style="margin:0; padding-left:18px; color:#555;">
                ${categoryList}
              </ul>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 30px;">
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>

          <!-- Insights -->
          <tr>
            <td style="padding:20px 30px;">
              <h4 style="margin:0 0 10px; font-size:16px;">Insights & Recommendations</h4>
              <ul style="margin:0; padding-left:18px; color:#555;">
                ${insightsList}
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafafa; text-align:center; padding:20px; font-size:12px; color:#999;">
              <p style="margin:0 0 5px;">
                This report was generated automatically based on your recent activity.
              </p>
              <p style="margin:0;">
                &copy; ${currentYear} AuroraFi. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
 </html>
   `;
};
