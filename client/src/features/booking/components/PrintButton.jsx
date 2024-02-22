import { jsPDF } from 'jspdf';


const generateInvoicePDF = (bookingData) => {
    console.log(bookingData)
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Invoice', 20, 20);

    // Add booking details
    pdf.setFontSize(12);
    pdf.text(`Booking ID: ${bookingData.booking_id}`, 20, 30);
    pdf.text(`Hotel Name: ${bookingData.hotelName}`, 20, 40);
    pdf.text(`Check-in Date: ${new Date(bookingData.checkIn).toLocaleDateString()}`, 20, 50);
    pdf.text(`Check-out Date: ${new Date(bookingData.checkOut).toLocaleDateString()}`, 20, 60);
    pdf.text(`Total Amount: $${bookingData.totalAmount}`, 20, 70);

    // Add table for room details
    const roomDetails = bookingData.roomDetails.map(room => [room.roomType, room.rate, room.noOfRooms, room.rate * room.noOfRooms]);
    pdf.autoTable({
        startY: 80,
        head: [['Room Type', 'Rate', 'No. of Rooms', 'Total']],
        body: roomDetails,
    });

    // Save PDF
    pdf.save('invoice.pdf');
}

const PrintButton=({booking})=>{
    console.log(booking)
    console.log('booking boorking')
    return (
        <button
            onClick={()=>{
              generateInvoicePDF(booking[0])
            }}
        class="bg-transparent text-black  border-2 sm:text-sm text-[0.7rem] font-bold border-black 
    sm:w-[150px] sm:h-[40px]    w-[80px] h-[25px]  ms-3 sm:ms-0"
      >
        print
      </button>
    )
}

export default PrintButton;