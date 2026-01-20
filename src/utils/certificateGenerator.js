import jsPDF from 'jspdf';

export const generateCourseCertificate = (user, course, assessment) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set colors
  const purpleColor = [68, 46, 102]; // #442e66
  const goldColor = [255, 182, 6]; // #ffb606
  const blueColor = [6, 106, 171]; // #066aab

  // Background - Light gradient effect
  doc.setFillColor(250, 250, 255);
  doc.rect(0, 0, 297, 210, 'F');

  // Purple border frame
  doc.setLineWidth(3);
  doc.setDrawColor(...purpleColor);
  doc.rect(10, 10, 277, 190);

  // Gold inner border
  doc.setLineWidth(1);
  doc.setDrawColor(...goldColor);
  doc.rect(15, 15, 267, 180);

  // Header - Nextec Logo Area
  doc.setFillColor(...purpleColor);
  doc.rect(20, 20, 257, 25, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('NEXTEC', 148.5, 35, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Learn. Grow. Thrive.', 148.5, 41, { align: 'center' });

  // Certificate Title
  doc.setTextColor(...purpleColor);
  doc.setFontSize(28);
  doc.setFont('times', 'bold');
  doc.text('Certificate of Completion', 148.5, 65, { align: 'center' });

  // Decorative line
  doc.setLineWidth(0.5);
  doc.setDrawColor(...goldColor);
  doc.line(80, 70, 217, 70);

  // Recipient section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('This certifies that', 148.5, 85, { align: 'center' });

  doc.setFontSize(24);
  doc.setFont('times', 'bold');
  doc.setTextColor(...purpleColor);
  doc.text(user.name, 148.5, 98, { align: 'center' });

  // Underline for name
  doc.setLineWidth(0.3);
  doc.setDrawColor(...purpleColor);
  const nameWidth = doc.getTextWidth(user.name);
  doc.line(148.5 - nameWidth / 2, 100, 148.5 + nameWidth / 2, 100);

  // Completion text
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('has successfully completed the', 148.5, 110, { align: 'center' });

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blueColor);
  const splitCourseTitle = doc.splitTextToSize(course.title, 220);
  doc.text(splitCourseTitle, 148.5, 120, { align: 'center' });

  // Achievement metrics
  if (assessment && assessment.postAssessment) {
    const yPos = 135;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('with distinction', 148.5, yPos, { align: 'center' });

    // Scores box
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(95, yPos + 5, 107, 15, 2, 2, 'F');

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...purpleColor);

    const preScore = parseFloat(assessment.preAssessment.avgConfidence);
    const postScore = parseFloat(assessment.postAssessment.avgConfidence);
    const improvement = postScore - preScore;

    doc.text(`Pre-Training Score: ${preScore.toFixed(2)}/5.0`, 100, yPos + 12);
    doc.text(`Post-Training Score: ${postScore.toFixed(2)}/5.0`, 100, yPos + 17);
    doc.text(`Improvement: +${improvement.toFixed(2)} points`, 165, yPos + 14.5);
  }

  // Date and details
  const completionDate = assessment?.postAssessment?.submittedAt
    ? new Date(assessment.postAssessment.submittedAt)
    : new Date();

  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Completion Date: ${formattedDate}`, 148.5, 165, { align: 'center' });

  // Signature section
  const sigYPos = 175;

  // Left signature - Instructor
  doc.setLineWidth(0.5);
  doc.setDrawColor(100, 100, 100);
  doc.line(50, sigYPos, 100, sigYPos);
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text(course.instructor, 75, sigYPos + 5, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Course Instructor', 75, sigYPos + 9, { align: 'center' });

  // Right signature - Director
  doc.line(197, sigYPos, 247, sigYPos);
  doc.setFontSize(9);
  doc.text('Dr. Sarah Johnson', 222, sigYPos + 5, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Program Director, Nextec EdTech', 222, sigYPos + 9, { align: 'center' });

  // Footer - Certificate ID
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  const certificateId = `CERT-${user.id}-${course.id}-${Date.now()}`.toUpperCase();
  doc.text(`Certificate ID: ${certificateId}`, 148.5, 200, { align: 'center' });
  doc.text('This certificate can be verified at nextec.edu/verify', 148.5, 204, { align: 'center' });

  // Decorative seals/badges in corners
  // Gold seal (bottom right)
  doc.setFillColor(...goldColor);
  doc.circle(265, 185, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('✓', 265, 188, { align: 'center' });

  // Save the PDF
  const fileName = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate_${user.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
  doc.save(fileName);
};
