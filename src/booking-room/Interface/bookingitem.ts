interface BookingItem {
    BookingNumber: string;
    studentName: string;
    emailAddress: string;
    phoneNumber: string;
    bookingDate: string;
    price: number;
    bookingFee: number;
    boardingHouse: {
      id: number;
      HouseName: string;
      Location: string;
      RoomType: string;
      GenderCategory: string;
      RoomNumber: string;
      Price: string;
      BookingFee: string;
      LandlordPhoneNumber: string;
      Status: string;
      maxPeople: number;
    };
  }
  