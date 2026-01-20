import jsPDF from 'jspdf';

export const generateROIReport = (roiData, assessmentStats) => {
  const doc = new jsPDF();

  // Set colors
  const purpleColor = [68, 46, 102]; // #442e66
  const goldColor = [255, 182, 6]; // #ffb606
  const blueColor = [6, 106, 171]; // #066aab
  const greenColor = [16, 185, 129]; // #10b981

  // Header with branding
  doc.setFillColor(...purpleColor);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('NEXTEC', 20, 20);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Learn. Grow. Thrive.', 20, 30);

  // Report Title
  doc.setTextColor(...purpleColor);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Training ROI Summary Report', 20, 55);

  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Generated: ${reportDate}`, 20, 65);

  // Executive Summary Section
  doc.setFontSize(14);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 20, 80);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const summary = `This report summarizes the Return on Investment (ROI) for the Microsoft 365 Workforce Enablement training program at College of DuPage. The analysis is based on ${roiData.totalParticipants} participants, with ${roiData.completedParticipants} completing both pre and post assessments.`;
  const splitSummary = doc.splitTextToSize(summary, 170);
  doc.text(splitSummary, 20, 88);

  // Key Metrics Box
  let yPosition = 105;
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(20, yPosition, 170, 65, 3, 3, 'F');

  yPosition += 8;
  doc.setFontSize(12);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Financial Metrics', 25, yPosition);

  yPosition += 10;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');

  // Metrics grid
  const metrics = [
    { label: 'Total Investment:', value: `$${roiData.totalInvestment.toLocaleString()}`, color: [200, 60, 60] },
    { label: 'Annual Cost Savings:', value: `$${roiData.annualCostSavings.toLocaleString()}`, color: greenColor },
    { label: 'ROI Percentage:', value: `${roiData.roiPercentage}%`, color: roiData.roiPercentage > 0 ? greenColor : [200, 60, 60] },
    { label: 'Payback Period:', value: `${roiData.paybackPeriodMonths} months`, color: blueColor },
    { label: 'Annual Time Saved:', value: `${roiData.annualTimeSaved.toLocaleString()} hours`, color: goldColor }
  ];

  metrics.forEach((metric, index) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(metric.label, 30, yPosition);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...metric.color);
    doc.text(metric.value, 105, yPosition);

    yPosition += 8;
  });

  // ROI Calculation Methodology
  yPosition += 10;
  doc.setFontSize(14);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('ROI Calculation Methodology', 20, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  const methodology = [
    'Training Cost: $500 per participant',
    'Average Hourly Rate: $35/hour',
    'Time Savings: 0.5 hours per week per confidence point gained',
    'Annual Calculation: 50 working weeks per year',
    `ROI Formula: ((Annual Savings - Total Investment) / Total Investment) × 100`
  ];

  methodology.forEach((line) => {
    doc.text(`  • ${line}`, 25, yPosition);
    yPosition += 6;
  });

  // Participant Impact Summary
  yPosition += 10;
  doc.setFontSize(14);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Participant Impact Summary', 20, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  const completionRate = roiData.totalParticipants > 0
    ? Math.round((roiData.completedParticipants / roiData.totalParticipants) * 100)
    : 0;

  const avgImprovement = assessmentStats.filter(s => s.hasPostAssessment)
    .reduce((sum, s) => sum + parseFloat(s.improvement), 0) / (roiData.completedParticipants || 1);

  const impactSummary = [
    `Total Participants: ${roiData.totalParticipants}`,
    `Completed Training: ${roiData.completedParticipants} (${completionRate}%)`,
    `Average Improvement: ${avgImprovement.toFixed(2)} confidence points`,
    `Average Time Saved: ${roiData.avgTimeSavedPerWeek} hours per week per participant`
  ];

  impactSummary.forEach((line) => {
    doc.text(`  • ${line}`, 25, yPosition);
    yPosition += 6;
  });

  // New page for detailed breakdown
  doc.addPage();
  yPosition = 20;

  doc.setFontSize(14);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Top 10 Participant Results', 20, yPosition);

  yPosition += 10;
  doc.setFontSize(9);

  // Table header
  doc.setFillColor(...purpleColor);
  doc.rect(20, yPosition, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Name', 25, yPosition + 5);
  doc.text('Department', 80, yPosition + 5);
  doc.text('Pre', 130, yPosition + 5);
  doc.text('Post', 150, yPosition + 5);
  doc.text('Gain', 170, yPosition + 5);

  yPosition += 8;

  // Table rows
  doc.setFont('helvetica', 'normal');
  const topParticipants = assessmentStats
    .filter(s => s.hasPostAssessment)
    .sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement))
    .slice(0, 10);

  topParticipants.forEach((participant, index) => {
    const bgColor = index % 2 === 0 ? [245, 245, 245] : [255, 255, 255];
    doc.setFillColor(...bgColor);
    doc.rect(20, yPosition, 170, 7, 'F');

    doc.setTextColor(60, 60, 60);
    doc.text(participant.userName.substring(0, 20), 25, yPosition + 5);
    doc.text(participant.workArea.replace('-', ' '), 80, yPosition + 5);
    doc.text(participant.preScore.toFixed(2), 130, yPosition + 5);
    doc.text(participant.postScore.toFixed(2), 150, yPosition + 5);
    doc.setTextColor(...greenColor);
    doc.text(`+${participant.improvement}`, 170, yPosition + 5);

    yPosition += 7;
  });

  // Recommendations
  yPosition += 10;
  doc.setFontSize(14);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', 20, yPosition);

  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  const recommendations = [
    'Continue the training program to maximize ROI through sustained adoption',
    'Focus on advanced modules for participants showing high engagement',
    'Implement quarterly refresher sessions to maintain skill retention',
    'Track long-term productivity metrics to validate time savings assumptions'
  ];

  recommendations.forEach((rec) => {
    const splitRec = doc.splitTextToSize(`  • ${rec}`, 165);
    doc.text(splitRec, 25, yPosition);
    yPosition += 6 * splitRec.length;
  });

  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Nextec EdTech - ROI Report - Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `nextec_roi_report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
