import { jsPDF } from 'jspdf';
import { ChapterNote, PDFProduct } from '../types';

export function generateSessionPDF(
  item: ChapterNote | PDFProduct,
  user?: { name?: string; mobile?: string; email?: string }
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const userName = user?.name || 'Aspirant';
  const userMobile = user?.mobile || '';
  const userIdentifier = userMobile ? `+91 ${userMobile}` : (user?.email || 'aspirant@bpsctre.org');
  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Function to add header and footer on any page
  const addHeaderFooter = (pageNo: number, totalPages: number) => {
    // Top banner
    doc.setFillColor(30, 58, 138); // Blue #1e3a8a
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('BPSC TRE 4.0 COMPUTER SCIENCE — OFFICIAL SESSION STUDY NOTES', margin, 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`SESSION #${item.sessionNumber} | ₹1 NOTE`, pageWidth - margin - 35, 8);

    // Subtle Watermark across center
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(240, 243, 246); // Very light grey watermark
    doc.text(`BPSC TRE 4.0 — LICENSED TO ${userIdentifier}`, pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 35,
    });

    // Bottom footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Candidate: ${userName} (${userIdentifier}) | Issued: ${issueDate}`, margin, pageHeight - 5);
    doc.text(`Page ${pageNo} of ${totalPages}`, pageWidth - margin - 22, pageHeight - 5);
  };

  // --- PAGE 1: TITLE & EXECUTIVE SUMMARY ---
  let y = 22;

  // Title box
  doc.setFillColor(239, 246, 255); // Soft blue background
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 138);
  doc.text(`Session ${item.sessionNumber}: ${item.title}`, margin + 5, y + 10);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text(item.titleHindi, margin + 5, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(`Target: BPSC TRE 4.0 Higher Secondary (10+2) Computer Science | Price: Only ₹1`, margin + 5, y + 26);
  doc.text(`Category: ${item.category} | Verified Curriculum: NCERT/SCERT Class 11-12 & BPSC Standards`, margin + 5, y + 32);

  y += 44;

  // Section 1: Quick Revision Bullets
  doc.setFillColor(30, 58, 138);
  doc.rect(margin, y, 4, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('1. HIGH-YIELD REVISION BULLETS (EXAM ESSENTIALS)', margin + 7, y + 7);
  y += 13;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);

  const bullets = 'shortNotes' in item && item.shortNotes
    ? item.shortNotes
    : [
        'Von Neumann architecture features single shared bus for program instructions and data.',
        'Address bus is strictly unidirectional; Data bus is bidirectional.',
        'Hit ratio measures percentage of memory accesses satisfied directly by high-speed Cache memory.',
        'SRAM is constructed from bistable latches (no refresh); DRAM uses capacitors needing refreshing.',
        'BIOS is stored in Flash ROM and runs Power-On Self-Test (POST) on system boot.'
      ];

  bullets.slice(0, 5).forEach((bullet) => {
    doc.setFillColor(37, 99, 235);
    doc.circle(margin + 3, y - 1, 1.2, 'F');
    const lines = doc.splitTextToSize(bullet, contentWidth - 8);
    doc.text(lines, margin + 7, y);
    y += lines.length * 5 + 2;
  });

  y += 4;

  // Formulas / Key Principles Box
  doc.setFillColor(254, 243, 199); // Warm amber box for formulas
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(146, 64, 14);
  doc.text('KEY FORMULAS & EXAM CHEAT CODES', margin + 5, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('• Effective Memory Access Time (EMAT):', margin + 5, y + 14);
  doc.setFont('courier', 'bold');
  doc.text('  EMAT = (Hit Ratio × T_cache) + (1 - Hit Ratio) × (T_cache + T_main)', margin + 5, y + 20);

  doc.setFont('helvetica', 'bold');
  doc.text('• Addressable Memory Size:', margin + 5, y + 26);
  doc.setFont('courier', 'bold');
  doc.text('  Max Capacity = 2^N bytes (for N address lines & byte addressable memory)', margin + 5, y + 30);

  y += 38;

  // High Frequency Exam Points Box
  doc.setFillColor(240, 253, 244); // Light emerald box
  doc.setDrawColor(134, 239, 172);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(22, 101, 52);
  doc.text('BPSC TRE 1.0, 2.0 & 3.0 HIGH FREQUENCY TRAPS', margin + 5, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(20, 83, 45);
  doc.text('1. Program Counter (PC) holds the address of the NEXT instruction, not the current one.', margin + 5, y + 14);
  doc.text('2. 2\'s complement has only ONE unique zero (00000000), unlike 1\'s complement.', margin + 5, y + 20);
  doc.text('3. Inorder traversal of a Binary Search Tree (BST) ALWAYS produces sorted keys in ascending order.', margin + 5, y + 26);
  doc.text('4. HAVING clause filters records based on aggregate functions; WHERE operates on raw rows.', margin + 5, y + 32);

  addHeaderFooter(1, 2);

  // --- PAGE 2: PRACTICE MCQS & VERIFICATION ---
  doc.addPage();
  y = 22;

  doc.setFillColor(30, 58, 138);
  doc.rect(margin, y, 4, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text('2. EXAM-ORIENTED PRACTICE MCQS WITH SOLUTIONS', margin + 7, y + 7);
  y += 15;

  const sampleMCQs = [
    {
      q: 'Q1. What is the 2\'s complement of the binary number 00010011 (+19) in an 8-bit system?',
      opts: ['A) 11101100', 'B) 11101101', 'C) 11101011', 'D) 00010011'],
      ans: 'B) 11101101',
      exp: 'Invert bits (11101100) and add 1 -> 11101101. (Asked in BPSC TRE 2.0)'
    },
    {
      q: 'Q2. Which condition in 2NF must be met to advance a relational table into 3NF?',
      opts: ['A) No Partial Dependency', 'B) No Transitive Dependency', 'C) No Multivalued Dependency', 'D) No Join Dependency'],
      ans: 'B) No Transitive Dependency',
      exp: '3NF removes transitive dependencies where a non-prime attribute determines another non-prime attribute.'
    },
    {
      q: 'Q3. The Inorder traversal of which tree structure yields sorted data in ascending order?',
      opts: ['A) Max Heap', 'B) Binary Search Tree', 'C) Complete Binary Tree', 'D) B-Tree only'],
      ans: 'B) Binary Search Tree',
      exp: 'In BST, Left < Root < Right. Hence, Inorder (L-Root-R) produces values in ascending order.'
    }
  ];

  sampleMCQs.forEach((mcq, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    const qLines = doc.splitTextToSize(mcq.q, contentWidth);
    doc.text(qLines, margin, y);
    y += qLines.length * 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(mcq.opts[0] + '     ' + mcq.opts[1], margin + 4, y + 2);
    doc.text(mcq.opts[2] + '     ' + mcq.opts[3], margin + 4, y + 7);
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(22, 101, 52);
    doc.text(`Correct Answer: ${mcq.ans}`, margin + 4, y);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(71, 85, 105);
    doc.text(`Explanation: ${mcq.exp}`, margin + 4, y + 4.5);
    y += 12;
  });

  // Stamp & Verification Box
  y = pageHeight - 50;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 58, 138);
  doc.text('VERIFIED STUDY MATERIAL CERTIFICATE', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('This PDF session note is prepared exclusively for BPSC TRE 4.0 Computer Science aspirants.', margin + 5, y + 12);
  doc.text(`Authorized Student: ${userName} | Transaction Id: pay_bpsc_${item.id.replace(/[^a-zA-Z0-9]/g, '')}_succ`, margin + 5, y + 17);
  doc.text('Disclaimer: For independent educational preparation only. Not affiliated with BPSC/Govt of Bihar.', margin + 5, y + 22);
  doc.text('Website: BPSC TRE Computer Science Portal | Note Price: ₹1 Only', margin + 5, y + 27);

  addHeaderFooter(2, 2);

  // Trigger download
  const cleanTitle = item.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`BPSC_TRE_4.0_${cleanTitle}_Note.pdf`);
}
