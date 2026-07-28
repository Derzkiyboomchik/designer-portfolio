import jsPDF from 'jspdf';
import { PROFILE_DATA } from '../data/portfolioData';

export const generateContractPDF = () => {
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Header background line
  doc.setDrawColor(30, 30, 30);
  doc.setLineWidth(0.5);
  doc.line(margin, 25, pageWidth - margin, 25);

  // Swiss Cross / Logo mark
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(20, 20, 20);
  doc.text('✦ STUDIO VANCE', margin, 18);

  // Document Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('MASTER FREELANCE DESIGN AGREEMENT — SWISS STANDARD', pageWidth - margin - 85, 18);

  // Metadata Block
  let y = 35;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text('DESIGNER / CONSULTANT:', margin, y);
  doc.text('CONTRACT DATE:', pageWidth - margin - 50, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text(PROFILE_DATA.name, margin, y + 5);
  doc.text(PROFILE_DATA.role, margin, y + 10);
  doc.text(PROFILE_DATA.contact.studio, margin, y + 15);
  doc.text(`Email: ${PROFILE_DATA.contact.email}`, margin, y + 20);

  const todayStr = new Date().toISOString().split('T')[0];
  doc.text(todayStr, pageWidth - margin - 50, y + 5);
  doc.text('Doc Ref: SV-AGREEMENT-2025/26', pageWidth - margin - 50, y + 10);

  // Divider Line
  y = 65;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);

  // Section 1: SCOPE OF SERVICES
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('1. SCOPE OF DESIGN SERVICES', margin, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const scopeText = [
    'Studio Vance provides high-end visual direction, spatial installation planning, editorial typography,',
    'and digital interface design. Specific project deliverables, milestone dates, and revision boundaries',
    'shall be defined in the attached Statement of Work (SOW) prior to execution.'
  ];
  scopeText.forEach(line => {
    doc.text(line, margin, y);
    y += 5;
  });

  // Section 2: FEE STRUCTURE & PAYMENT TERMS
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('2. COMPENSATION & PAYMENT TERMS', margin, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const feeText = [
    '• Standard Retainer: 50% upfront upon agreement execution, 50% upon final deliverable handover.',
    '• Hourly Rate for Scope Additions: CHF 180 / Hour (excl. Swiss VAT).',
    '• Payment Window: Strictly net 14 days from invoice receipt date.',
    '• Late Payments: Subject to a 5% statutory interest per annum under Swiss Code of Obligations.'
  ];
  feeText.forEach(line => {
    doc.text(line, margin, y);
    y += 5;
  });

  // Section 3: INTELLECTUAL PROPERTY & USAGE RIGHTS
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('3. INTELLECTUAL PROPERTY & LICENSING', margin, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const ipText = [
    'Upon full payment of all fees, Client receives an exclusive worldwide license for the approved final',
    'artwork for the intended commercial media. Studio Vance retains full authorship rights and the',
    'right to feature all completed work in studio portfolios, exhibitions, and design publications.'
  ];
  ipText.forEach(line => {
    doc.text(line, margin, y);
    y += 5;
  });

  // Section 4: GOVERNING LAW
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text('4. JURISDICTION & GOVERNING LAW', margin, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text('This agreement shall be governed exclusively by the laws of Switzerland, with venue in Zurich.', margin, y);

  // Signatures Area
  y = pageHeight - 55;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text('ACCEPTED & AGREED:', margin, y);

  y += 15;
  // Designer signature line
  doc.setDrawColor(100, 100, 100);
  doc.line(margin, y, margin + 65, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Elena Vance (Studio Vance)', margin, y + 4);
  doc.text('Principal Designer', margin, y + 8);

  // Client signature line
  doc.line(pageWidth - margin - 65, y, pageWidth - margin, y);
  doc.text('Authorized Client Representative', pageWidth - margin - 65, y + 4);
  doc.text('Company / Date', pageWidth - margin - 65, y + 8);

  // Footer stamp
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Page 1 of 1 — Studio Vance Zurich • Swiss Minimalism Standards Document', margin, pageHeight - 10);

  // Save the PDF
  doc.save(`Elena_Vance_Design_Contract_${todayStr}.pdf`);
};
