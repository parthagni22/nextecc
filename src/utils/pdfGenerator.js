import jsPDF from 'jspdf';

export const generateCoursePDF = (course) => {
  const doc = new jsPDF();

  // Set colors
  const purpleColor = [68, 46, 102]; // #442e66
  const goldColor = [255, 182, 6]; // #ffb606
  const blueColor = [6, 106, 171]; // #066aab

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

  // Course Title
  doc.setTextColor(...purpleColor);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(course.title, 20, 55);

  // Course Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Instructor: ${course.instructor}`, 20, 65);
  doc.text(`Duration: ${course.duration}`, 20, 72);
  doc.text(`Level: ${course.level}`, 20, 79);
  doc.text(`Category: ${course.category}`, 20, 86);

  // Description
  doc.setFontSize(12);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Course Description', 20, 100);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const splitDescription = doc.splitTextToSize(course.description, 170);
  doc.text(splitDescription, 20, 108);

  // Curriculum
  let yPosition = 125;
  doc.setFontSize(12);
  doc.setTextColor(...purpleColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Course Curriculum', 20, yPosition);

  yPosition += 10;
  doc.setFontSize(10);

  course.curriculum.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    // Module title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...blueColor);
    doc.text(`${item.module}`, 20, yPosition);
    yPosition += 7;

    // Topics
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    item.topics.forEach((topic) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`  • ${topic}`, 25, yPosition);
      yPosition += 6;
    });

    yPosition += 5;
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Nextec EdTech - Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_curriculum.pdf`;
  doc.save(fileName);
};
