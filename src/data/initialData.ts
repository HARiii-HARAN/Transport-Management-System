import { User, Bus, Route, Driver, Trip, Booking, CityInfo } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-001',
    name: 'Ramesh Kumar',
    email: 'passenger@gotravels.com',
    phone: '+91 98401 23456',
    role: 'passenger',
    createdAt: '2026-08-15',
    password: 'Passenger123',
    address: 'No. 24, Gandhi Road, Adyar, Chennai',
    preferredCity: 'Chennai'
  },
  {
    id: 'USR-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'passenger',
    createdAt: '2026-09-02',
    password: 'Password123',
    address: '45, Indiranagar 100ft Road, Bengaluru',
    preferredCity: 'Bengaluru'
  },
  {
    id: 'USR-003',
    name: 'Arunachalam V.',
    email: 'arun.travels@example.com',
    phone: '+91 94441 55678',
    role: 'passenger',
    createdAt: '2026-09-20',
    password: 'Password123',
    address: '12, Crosscut Road, Gandhipuram, Coimbatore',
    preferredCity: 'Coimbatore'
  },
  {
    id: 'ADMIN-001',
    name: 'GoTravels Fleet Administrator',
    email: 'admin@gotravels.com',
    phone: '+91 44 2841 0099',
    role: 'admin',
    createdAt: '2026-01-01',
    password: 'Admin123',
    address: 'GoTravels Central Terminal, Koyambedu, Chennai - 600107'
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'DRV-101',
    name: 'M. Selvam',
    phone: '+91 98410 77651',
    email: 'selvam.drv@gotravels.com',
    licenseNumber: 'TN0120150004921',
    experienceYears: 14,
    assignedBusId: 'BUS-01',
    status: 'On Trip',
    rating: 4.9
  },
  {
    id: 'DRV-102',
    name: 'Rajendra Prasad',
    phone: '+91 97422 33109',
    email: 'rajendra.drv@gotravels.com',
    licenseNumber: 'KA0420120008819',
    experienceYears: 11,
    assignedBusId: 'BUS-02',
    status: 'Available',
    rating: 4.8
  },
  {
    id: 'DRV-103',
    name: 'K. Senthil Nathan',
    phone: '+91 98944 11223',
    email: 'senthil.drv@gotravels.com',
    licenseNumber: 'TN5920140003411',
    experienceYears: 16,
    assignedBusId: 'BUS-03',
    status: 'Available',
    rating: 4.9
  },
  {
    id: 'DRV-104',
    name: 'Venkatesh Babu',
    phone: '+91 99881 22334',
    email: 'venkatesh.drv@gotravels.com',
    licenseNumber: 'AP0920160007782',
    experienceYears: 9,
    assignedBusId: 'BUS-04',
    status: 'Available',
    rating: 4.7
  },
  {
    id: 'DRV-105',
    name: 'Antony Joseph',
    phone: '+91 94471 99881',
    email: 'antony.drv@gotravels.com',
    licenseNumber: 'KL0720130006214',
    experienceYears: 12,
    assignedBusId: 'BUS-05',
    status: 'Off Duty',
    rating: 4.8
  }
];

export const INITIAL_BUSES: Bus[] = [
  {
    id: 'BUS-01',
    regNumber: 'TN 01 AB 4455',
    operatorName: 'GoTravels Royal Cruise',
    model: 'Volvo 9600 Multi-Axle Sleeper',
    busType: 'Volvo Multi-Axle AC Sleeper',
    isAC: true,
    isSleeper: true,
    totalSeats: 30, // 15 lower + 15 upper
    amenities: ['WiFi', 'Charging Point', 'Air Conditioning', 'Blanket & Pillow', 'Mineral Water', 'Reading Lamp', 'Emergency Exit', 'Live GPS Tracking'],
    assignedDriverId: 'DRV-101',
    status: 'Active',
    rating: 4.9,
    totalReviews: 342
  },
  {
    id: 'BUS-02',
    regNumber: 'KA 05 MN 9021',
    operatorName: 'GoTravels Platinum Club',
    model: 'Scania Metrolink HD Coach',
    busType: 'AC Semi-Sleeper (2+2)',
    isAC: true,
    isSleeper: false,
    totalSeats: 40,
    amenities: ['WiFi', 'Charging Point', 'Air Conditioning', 'Water Bottle', 'Reclining Push-Back Seats', 'Reading Lamp', 'USB Ports'],
    assignedDriverId: 'DRV-102',
    status: 'Active',
    rating: 4.7,
    totalReviews: 218
  },
  {
    id: 'BUS-03',
    regNumber: 'TN 59 CD 1289',
    operatorName: 'GoTravels Dreamliner',
    model: 'BharatBenz 1624 AC Sleeper',
    busType: 'AC Sleeper (2+1)',
    isAC: true,
    isSleeper: true,
    totalSeats: 30,
    amenities: ['Charging Point', 'Air Conditioning', 'Blanket & Pillow', 'Mineral Water', 'Reading Lamp', 'Fire Extinguisher'],
    assignedDriverId: 'DRV-103',
    status: 'Active',
    rating: 4.8,
    totalReviews: 189
  },
  {
    id: 'BUS-04',
    regNumber: 'TS 09 XY 7720',
    operatorName: 'GoTravels Executive Express',
    model: 'Volvo B11R I-Shift Coach',
    busType: 'AC Semi-Sleeper (2+2)',
    isAC: true,
    isSleeper: false,
    totalSeats: 40,
    amenities: ['WiFi', 'Charging Point', 'Air Conditioning', 'Pushback Seats', 'Mineral Water', 'Emergency Hammer'],
    assignedDriverId: 'DRV-104',
    status: 'Active',
    rating: 4.6,
    totalReviews: 164
  },
  {
    id: 'BUS-05',
    regNumber: 'KL 07 EF 3410',
    operatorName: 'GoTravels GreenLine Classic',
    model: 'Tata Marcopolo Intercity 2+2',
    busType: 'Non-AC Seater (2+2)',
    isAC: false,
    isSleeper: false,
    totalSeats: 40,
    amenities: ['Charging Point', 'Comfort Seats', 'Reading Lamp', 'First Aid Box', 'Luggage Compartment'],
    assignedDriverId: 'DRV-105',
    status: 'Active',
    rating: 4.4,
    totalReviews: 95
  },
  {
    id: 'BUS-06',
    regNumber: 'TN 07 PQ 8821',
    operatorName: 'GoTravels Star Luxury',
    model: 'Mercedes-Benz SuperCoach AC',
    busType: 'BharatBenz Luxury AC (2+2)',
    isAC: true,
    isSleeper: false,
    totalSeats: 36,
    amenities: ['WiFi', 'Charging Point', 'Air Conditioning', 'Snacks', 'Mineral Water', 'Deep Reclining Seats'],
    status: 'Maintenance',
    rating: 4.8,
    totalReviews: 140
  }
];

export const INITIAL_ROUTES: Route[] = [
  {
    id: 'RT-01',
    sourceCity: 'Chennai',
    destinationCity: 'Bengaluru',
    distanceKm: 345,
    estimatedDuration: '6h 30m',
    intermediateStops: ['Sriperumbudur', 'Vellore Bypass', 'Ambur', 'Hosur'],
    isPopular: true
  },
  {
    id: 'RT-02',
    sourceCity: 'Bengaluru',
    destinationCity: 'Chennai',
    distanceKm: 345,
    estimatedDuration: '6h 30m',
    intermediateStops: ['Hosur', 'Ambur', 'Vellore Bypass', 'Sriperumbudur'],
    isPopular: true
  },
  {
    id: 'RT-03',
    sourceCity: 'Chennai',
    destinationCity: 'Madurai',
    distanceKm: 460,
    estimatedDuration: '7h 45m',
    intermediateStops: ['Tindivanam', 'Villupuram', 'Perambalur', 'Tiruchirappalli (Viralimalai Bypass)'],
    isPopular: true
  },
  {
    id: 'RT-04',
    sourceCity: 'Madurai',
    destinationCity: 'Chennai',
    distanceKm: 460,
    estimatedDuration: '7h 45m',
    intermediateStops: ['Tiruchirappalli', 'Villupuram', 'Tindivanam', 'Chengalpattu'],
    isPopular: true
  },
  {
    id: 'RT-05',
    sourceCity: 'Chennai',
    destinationCity: 'Coimbatore',
    distanceKm: 510,
    estimatedDuration: '8h 15m',
    intermediateStops: ['Kanchipuram Bypass', 'Salem New Bus Stand', 'Erode Bypass', 'Avinashi'],
    isPopular: true
  },
  {
    id: 'RT-06',
    sourceCity: 'Bengaluru',
    destinationCity: 'Hyderabad',
    distanceKm: 570,
    estimatedDuration: '9h 00m',
    intermediateStops: ['Chikkaballapur', 'Anantapur Bypass', 'Kurnool Tollgate', 'Jadcherla'],
    isPopular: true
  },
  {
    id: 'RT-07',
    sourceCity: 'Chennai',
    destinationCity: 'Tiruchirappalli',
    distanceKm: 330,
    estimatedDuration: '5h 30m',
    intermediateStops: ['Tambaram', 'Chengalpattu Bypass', 'Tindivanam', 'Villupuram', 'Ulundurpet'],
    isPopular: true
  },
  {
    id: 'RT-08',
    sourceCity: 'Coimbatore',
    destinationCity: 'Kochi',
    distanceKm: 190,
    estimatedDuration: '4h 15m',
    intermediateStops: ['Palakkad Bypass', 'Vadakkencherry', 'Thrissur Round', 'Aluva Bypass'],
    isPopular: true
  },
  {
    id: 'RT-09',
    sourceCity: 'Hyderabad',
    destinationCity: 'Bengaluru',
    distanceKm: 570,
    estimatedDuration: '9h 00m',
    intermediateStops: ['Jadcherla', 'Kurnool', 'Anantapur', 'Chikkaballapur'],
    isPopular: false
  }
];

export const INITIAL_TRIPS: Trip[] = [
  // Today trips (2026-10-23)
  {
    id: 'TRIP-101',
    routeId: 'RT-01', // Chennai -> Bengaluru
    busId: 'BUS-01', // Royal Cruise Volvo Sleeper
    driverId: 'DRV-101',
    journeyDate: '2026-10-23',
    departureTime: '21:30',
    arrivalTime: '05:00',
    fare: 950,
    boardingPoints: [
      { time: '21:30', location: 'Koyambedu Omni Bus Stand', landmark: 'Platform 3, Near Hotel Saravana Bhavan' },
      { time: '22:00', location: 'Ashok Pillar', landmark: 'Near Police Booth, Metro Gate 2' },
      { time: '22:30', location: 'Guindy Kathipara Junction', landmark: 'Near Guindy Railway Station Skywalk' },
      { time: '23:00', location: 'Tambaram East', landmark: 'Near Hindu Mission Hospital' },
      { time: '23:30', location: 'Sriperumbudur Toll Plaza', landmark: 'Opposite Toll Gate Office' }
    ],
    droppingPoints: [
      { time: '04:15', location: 'Electronic City Toll', landmark: 'Under Flyover Exit' },
      { time: '04:35', location: 'Silk Board Junction', landmark: 'Near Petrol Bunk' },
      { time: '04:50', location: 'Madiwala', landmark: 'Opposite Police Station' },
      { time: '05:00', location: 'Majestic Bus Stand', landmark: 'Near Platform 1, Sangam Cinema' }
    ],
    bookedSeats: ['L1', 'L2', 'L3', 'U5', 'U6'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-102',
    routeId: 'RT-01', // Chennai -> Bengaluru Morning
    busId: 'BUS-02', // Scania Semi-Sleeper
    driverId: 'DRV-102',
    journeyDate: '2026-10-23',
    departureTime: '06:00',
    arrivalTime: '12:30',
    fare: 680,
    boardingPoints: [
      { time: '06:00', location: 'Koyambedu Omni Bus Stand', landmark: 'Platform 5' },
      { time: '06:30', location: 'Poonamallee Bypass', landmark: 'Near Saveetha Dental College' },
      { time: '07:15', location: 'Sriperumbudur', landmark: 'Toll Plaza' }
    ],
    droppingPoints: [
      { time: '11:45', location: 'Hosur Bus Stand', landmark: 'Bus Bay 2' },
      { time: '12:15', location: 'Electronic City', landmark: 'Near Infosys Gate 1' },
      { time: '12:30', location: 'Majestic KBS', landmark: 'Platform 18' }
    ],
    bookedSeats: ['1', '2', '5', '6', '12', '14', '15'],
    status: 'Completed'
  },
  {
    id: 'TRIP-103',
    routeId: 'RT-03', // Chennai -> Madurai Night
    busId: 'BUS-03', // BharatBenz AC Sleeper
    driverId: 'DRV-103',
    journeyDate: '2026-10-23',
    departureTime: '22:15',
    arrivalTime: '06:00',
    fare: 1100,
    boardingPoints: [
      { time: '22:15', location: 'Koyambedu Omni Bus Stand', landmark: 'Platform 8' },
      { time: '22:50', location: 'Guindy', landmark: 'Near Chellamani Stores' },
      { time: '23:20', location: 'Tambaram Sanatorium', landmark: 'MEPZ Flyover Foot' },
      { time: '23:55', location: 'Perungalathur', landmark: 'Opposite Kamaraj High School' }
    ],
    droppingPoints: [
      { time: '05:15', location: 'Samayanallur Toll Gate', landmark: 'Near Toll Office' },
      { time: '05:40', location: 'Periyar Bus Stand', landmark: 'Near Railway Station Exit' },
      { time: '06:00', location: 'Mattuthavani Integrated Bus Terminus', landmark: 'Omni Bus Stand Platform 1' }
    ],
    bookedSeats: ['L5', 'L6', 'U1', 'U2', 'U3'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-104',
    routeId: 'RT-05', // Chennai -> Coimbatore
    busId: 'BUS-04', // Volvo B11R
    driverId: 'DRV-104',
    journeyDate: '2026-10-23',
    departureTime: '21:00',
    arrivalTime: '05:15',
    fare: 890,
    boardingPoints: [
      { time: '21:00', location: 'Koyambedu', landmark: 'Bay 12' },
      { time: '21:40', location: 'Porur Toll', landmark: 'Near Saravana Bhavan' },
      { time: '22:10', location: 'Sriperumbudur', landmark: 'Near Rajiv Gandhi Memorial' }
    ],
    droppingPoints: [
      { time: '04:30', location: 'Hopes College', landmark: 'Near PSG Tech' },
      { time: '04:50', location: 'Lakshmi Mills Junction', landmark: 'Near GKNM Hospital' },
      { time: '05:15', location: 'Gandhipuram Omni Bus Stand', landmark: 'Near Sree Annapoorna Hotel' }
    ],
    bookedSeats: ['3', '4', '7', '8', '19', '20'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-105',
    routeId: 'RT-06', // Bengaluru -> Hyderabad
    busId: 'BUS-01',
    driverId: 'DRV-101',
    journeyDate: '2026-10-23',
    departureTime: '20:30',
    arrivalTime: '05:30',
    fare: 1250,
    boardingPoints: [
      { time: '20:30', location: 'Madiwala', landmark: 'GoTravels Lounge, Near Total Mall' },
      { time: '21:00', location: 'Shantinagar Bus Station', landmark: 'Platform 4' },
      { time: '21:45', location: 'Hebbal Flyover', landmark: 'Near Esteem Mall' },
      { time: '22:15', location: 'Yelahanka Bypass', landmark: 'Near Police Station' }
    ],
    droppingPoints: [
      { time: '04:45', location: 'Shamshabad Airport Approach', landmark: 'Near Toll Plaza' },
      { time: '05:05', location: 'Aramghar Junction', landmark: 'Under Flyover' },
      { time: '05:20', location: 'Mehdipatnam', landmark: 'Near Pillar 48' },
      { time: '05:30', location: 'Ameerpet', landmark: 'Opposite Big Bazaar' }
    ],
    bookedSeats: ['L10', 'L11', 'U12'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-106',
    routeId: 'RT-07', // Chennai -> Tiruchirappalli
    busId: 'BUS-02',
    driverId: 'DRV-102',
    journeyDate: '2026-10-23',
    departureTime: '15:30',
    arrivalTime: '21:00',
    fare: 550,
    boardingPoints: [
      { time: '15:30', location: 'Koyambedu', landmark: 'Bay 4' },
      { time: '16:15', location: 'Tambaram', landmark: 'Near Railway Station' }
    ],
    droppingPoints: [
      { time: '20:30', location: 'Tiruchirappalli Tollgate', landmark: 'Samayapuram Toll' },
      { time: '21:00', location: 'Central Bus Stand Trichy', landmark: 'Near Chatram Bus Stand' }
    ],
    bookedSeats: ['1', '2', '3', '4', '9', '10', '11'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-107',
    routeId: 'RT-08', // Coimbatore -> Kochi
    busId: 'BUS-05',
    driverId: 'DRV-105',
    journeyDate: '2026-10-23',
    departureTime: '08:00',
    arrivalTime: '12:15',
    fare: 350,
    boardingPoints: [
      { time: '08:00', location: 'Gandhipuram SETC Stand', landmark: 'Near Crosscut Road' },
      { time: '08:30', location: 'Ukkadam Bus Stand', landmark: 'Palakkad Road Platform' }
    ],
    droppingPoints: [
      { time: '11:30', location: 'Aluva Flyover', landmark: 'Near Metro Station' },
      { time: '12:00', location: 'Edappally Toll', landmark: 'Near Lulu Mall' },
      { time: '12:15', location: 'Vyttila Mobility Hub', landmark: 'Bay 6' }
    ],
    bookedSeats: ['1', '2', '14', '15', '22'],
    status: 'Scheduled'
  },

  // Tomorrow trips (2026-10-24)
  {
    id: 'TRIP-201',
    routeId: 'RT-01', // Chennai -> Bengaluru Night
    busId: 'BUS-01',
    driverId: 'DRV-101',
    journeyDate: '2026-10-24',
    departureTime: '21:30',
    arrivalTime: '05:00',
    fare: 950,
    boardingPoints: [
      { time: '21:30', location: 'Koyambedu Omni Bus Stand', landmark: 'Platform 3' },
      { time: '22:30', location: 'Guindy', landmark: 'Near Kathipara Skywalk' },
      { time: '23:00', location: 'Tambaram East', landmark: 'Opposite Railway Station' }
    ],
    droppingPoints: [
      { time: '04:15', location: 'Electronic City Toll', landmark: 'Under Flyover' },
      { time: '04:35', location: 'Silk Board', landmark: 'Near Petrol Bunk' },
      { time: '05:00', location: 'Majestic Bus Stand', landmark: 'Platform 1' }
    ],
    bookedSeats: ['L1', 'L2'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-202',
    routeId: 'RT-01', // Chennai -> Bengaluru Afternoon
    busId: 'BUS-02',
    driverId: 'DRV-102',
    journeyDate: '2026-10-24',
    departureTime: '14:00',
    arrivalTime: '20:30',
    fare: 720,
    boardingPoints: [
      { time: '14:00', location: 'Koyambedu Omni Bus Stand', landmark: 'Platform 5' },
      { time: '14:45', location: 'Poonamallee', landmark: 'Near Bypass Ring Road' }
    ],
    droppingPoints: [
      { time: '19:45', location: 'Hosur Bus Stand', landmark: 'Opposite Municipal Office' },
      { time: '20:30', location: 'Majestic KBS', landmark: 'Platform 18' }
    ],
    bookedSeats: ['11', '12', '17', '18'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-203',
    routeId: 'RT-02', // Bengaluru -> Chennai Night
    busId: 'BUS-03',
    driverId: 'DRV-103',
    journeyDate: '2026-10-24',
    departureTime: '22:00',
    arrivalTime: '05:30',
    fare: 980,
    boardingPoints: [
      { time: '22:00', location: 'Majestic KBS', landmark: 'Sangam Cinema' },
      { time: '22:35', location: 'Shantinagar Bus Station', landmark: 'Platform 2' },
      { time: '23:15', location: 'Electronic City Toll', landmark: 'Near Toll Office' }
    ],
    droppingPoints: [
      { time: '04:30', location: 'Sriperumbudur Toll', landmark: 'Near Rajiv Gandhi Memorial' },
      { time: '05:00', location: 'Guindy Kathipara', landmark: 'Guindy Metro' },
      { time: '05:30', location: 'Koyambedu Omni Bus Stand', landmark: 'Bay 7' }
    ],
    bookedSeats: ['L3', 'L4', 'U9'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-204',
    routeId: 'RT-03', // Chennai -> Madurai
    busId: 'BUS-03',
    driverId: 'DRV-103',
    journeyDate: '2026-10-24',
    departureTime: '22:15',
    arrivalTime: '06:00',
    fare: 1100,
    boardingPoints: [
      { time: '22:15', location: 'Koyambedu Omni Bus Stand', landmark: 'Platform 8' },
      { time: '23:20', location: 'Tambaram MEPZ', landmark: 'Flyover Foot' }
    ],
    droppingPoints: [
      { time: '05:40', location: 'Periyar Bus Stand', landmark: 'Railway Station Exit' },
      { time: '06:00', location: 'Mattuthavani Bus Terminus', landmark: 'Omni Bay 1' }
    ],
    bookedSeats: ['L1', 'L2'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-205',
    routeId: 'RT-05', // Chennai -> Coimbatore
    busId: 'BUS-04',
    driverId: 'DRV-104',
    journeyDate: '2026-10-24',
    departureTime: '21:00',
    arrivalTime: '05:15',
    fare: 890,
    boardingPoints: [
      { time: '21:00', location: 'Koyambedu', landmark: 'Bay 12' },
      { time: '21:45', location: 'Porur', landmark: 'Near Saravana Bhavan' }
    ],
    droppingPoints: [
      { time: '04:30', location: 'Hopes College', landmark: 'PSG Tech Gate' },
      { time: '05:15', location: 'Gandhipuram Omni Bus Stand', landmark: 'Sree Annapoorna' }
    ],
    bookedSeats: ['5', '6', '23', '24'],
    status: 'Scheduled'
  },
  {
    id: 'TRIP-206',
    routeId: 'RT-06', // Bengaluru -> Hyderabad
    busId: 'BUS-01',
    driverId: 'DRV-101',
    journeyDate: '2026-10-24',
    departureTime: '20:30',
    arrivalTime: '05:30',
    fare: 1250,
    boardingPoints: [
      { time: '20:30', location: 'Madiwala', landmark: 'GoTravels Lounge' },
      { time: '21:45', location: 'Hebbal Flyover', landmark: 'Esteem Mall' }
    ],
    droppingPoints: [
      { time: '04:45', location: 'Shamshabad', landmark: 'Toll Plaza' },
      { time: '05:30', location: 'Ameerpet', landmark: 'Big Bazaar' }
    ],
    bookedSeats: ['L1', 'L2', 'U1', 'U2'],
    status: 'Scheduled'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  // 1. Confirmed upcoming booking for demo passenger USR-001
  {
    id: 'BK-782194',
    pnr: 'GT26R782',
    tripId: 'TRIP-101',
    userId: 'USR-001',
    passengers: [
      {
        seatNumber: 'L1',
        name: 'Ramesh Kumar',
        age: 34,
        gender: 'Male'
      },
      {
        seatNumber: 'L2',
        name: 'Suresh Kumar',
        age: 31,
        gender: 'Male'
      }
    ],
    contactEmail: 'passenger@gotravels.com',
    contactPhone: '+91 98401 23456',
    emergencyContact: '+91 94440 98765',
    seatNumbers: ['L1', 'L2'],
    baseFare: 1900,
    taxAmount: 95,
    discountAmount: 150,
    totalFare: 1845,
    sourceCity: 'Chennai',
    destinationCity: 'Bengaluru',
    busOperator: 'GoTravels Royal Cruise',
    busType: 'Volvo Multi-Axle AC Sleeper',
    busRegNumber: 'TN 01 AB 4455',
    journeyDate: '2026-10-23',
    departureTime: '21:30',
    arrivalTime: '05:00',
    boardingPoint: {
      time: '21:30',
      location: 'Koyambedu Omni Bus Stand',
      landmark: 'Platform 3, Near Hotel Saravana Bhavan'
    },
    droppingPoint: {
      time: '05:00',
      location: 'Majestic Bus Stand',
      landmark: 'Near Platform 1, Sangam Cinema'
    },
    bookingDate: '2026-10-20T14:32:00.000Z',
    status: 'Confirmed',
    paymentMethod: 'UPI / QR'
  },
  // 2. Past completed booking for demo passenger USR-001
  {
    id: 'BK-619280',
    pnr: 'GT26M619',
    tripId: 'TRIP-102',
    userId: 'USR-001',
    passengers: [
      {
        seatNumber: '14',
        name: 'Ramesh Kumar',
        age: 34,
        gender: 'Male'
      }
    ],
    contactEmail: 'passenger@gotravels.com',
    contactPhone: '+91 98401 23456',
    seatNumbers: ['14'],
    baseFare: 680,
    taxAmount: 34,
    discountAmount: 0,
    totalFare: 714,
    sourceCity: 'Chennai',
    destinationCity: 'Bengaluru',
    busOperator: 'GoTravels Platinum Club',
    busType: 'AC Semi-Sleeper (2+2)',
    busRegNumber: 'KA 05 MN 9021',
    journeyDate: '2026-10-10',
    departureTime: '06:00',
    arrivalTime: '12:30',
    boardingPoint: {
      time: '06:00',
      location: 'Koyambedu Omni Bus Stand',
      landmark: 'Platform 5'
    },
    droppingPoint: {
      time: '12:30',
      location: 'Majestic KBS',
      landmark: 'Platform 18'
    },
    bookingDate: '2026-10-07T09:15:00.000Z',
    status: 'Completed',
    paymentMethod: 'Credit/Debit Card'
  },
  // 3. Cancelled booking for demo passenger USR-001 (to demo cancellation history)
  {
    id: 'BK-552910',
    pnr: 'GT26C552',
    tripId: 'TRIP-103',
    userId: 'USR-001',
    passengers: [
      {
        seatNumber: 'U8',
        name: 'Ramesh Kumar',
        age: 34,
        gender: 'Male'
      }
    ],
    contactEmail: 'passenger@gotravels.com',
    contactPhone: '+91 98401 23456',
    seatNumbers: ['U8'],
    baseFare: 1100,
    taxAmount: 55,
    discountAmount: 0,
    totalFare: 1155,
    sourceCity: 'Chennai',
    destinationCity: 'Madurai',
    busOperator: 'GoTravels Dreamliner',
    busType: 'AC Sleeper (2+1)',
    busRegNumber: 'TN 59 CD 1289',
    journeyDate: '2026-10-15',
    departureTime: '22:15',
    arrivalTime: '06:00',
    boardingPoint: {
      time: '22:15',
      location: 'Koyambedu Omni Bus Stand',
      landmark: 'Platform 8'
    },
    droppingPoint: {
      time: '06:00',
      location: 'Mattuthavani Integrated Bus Terminus',
      landmark: 'Omni Bus Stand Platform 1'
    },
    bookingDate: '2026-10-12T16:20:00.000Z',
    status: 'Cancelled',
    paymentMethod: 'UPI / QR',
    cancellationDate: '2026-10-13T10:00:00.000Z',
    refundAmount: 1155
  },
  // 4. Booking for Priya Sharma USR-002
  {
    id: 'BK-890123',
    pnr: 'GT26P890',
    tripId: 'TRIP-105',
    userId: 'USR-002',
    passengers: [
      {
        seatNumber: 'L10',
        name: 'Priya Sharma',
        age: 28,
        gender: 'Female'
      },
      {
        seatNumber: 'L11',
        name: 'Ananya Sharma',
        age: 25,
        gender: 'Female'
      }
    ],
    contactEmail: 'priya.sharma@example.com',
    contactPhone: '+91 98765 43210',
    seatNumbers: ['L10', 'L11'],
    baseFare: 2500,
    taxAmount: 125,
    discountAmount: 200,
    totalFare: 2425,
    sourceCity: 'Bengaluru',
    destinationCity: 'Hyderabad',
    busOperator: 'GoTravels Royal Cruise',
    busType: 'Volvo Multi-Axle AC Sleeper',
    busRegNumber: 'TN 01 AB 4455',
    journeyDate: '2026-10-23',
    departureTime: '20:30',
    arrivalTime: '05:30',
    boardingPoint: {
      time: '20:30',
      location: 'Madiwala',
      landmark: 'GoTravels Lounge'
    },
    droppingPoint: {
      time: '05:30',
      location: 'Ameerpet',
      landmark: 'Opposite Big Bazaar'
    },
    bookingDate: '2026-10-21T18:40:00.000Z',
    status: 'Confirmed',
    paymentMethod: 'Credit/Debit Card'
  },
  // 5. Booking for Arunachalam USR-003
  {
    id: 'BK-442110',
    pnr: 'GT26A442',
    tripId: 'TRIP-104',
    userId: 'USR-003',
    passengers: [
      {
        seatNumber: '3',
        name: 'Arunachalam V.',
        age: 48,
        gender: 'Male'
      },
      {
        seatNumber: '4',
        name: 'Meenakshi A.',
        age: 44,
        gender: 'Female'
      }
    ],
    contactEmail: 'arun.travels@example.com',
    contactPhone: '+91 94441 55678',
    seatNumbers: ['3', '4'],
    baseFare: 1780,
    taxAmount: 89,
    discountAmount: 100,
    totalFare: 1769,
    sourceCity: 'Chennai',
    destinationCity: 'Coimbatore',
    busOperator: 'GoTravels Executive Express',
    busType: 'AC Semi-Sleeper (2+2)',
    busRegNumber: 'TS 09 XY 7720',
    journeyDate: '2026-10-23',
    departureTime: '21:00',
    arrivalTime: '05:15',
    boardingPoint: {
      time: '21:00',
      location: 'Koyambedu',
      landmark: 'Bay 12'
    },
    droppingPoint: {
      time: '05:15',
      location: 'Gandhipuram Omni Bus Stand',
      landmark: 'Near Sree Annapoorna Hotel'
    },
    bookingDate: '2026-10-22T11:10:00.000Z',
    status: 'Confirmed',
    paymentMethod: 'Net Banking'
  }
];

export const POPULAR_CITIES: CityInfo[] = [
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    popularPickupPoints: ['Koyambedu Omni Stand', 'Guindy Kathipara', 'Tambaram', 'Perungalathur', 'Porur Toll'],
    popularDropPoints: ['Koyambedu', 'Tambaram', 'Guindy', 'Central Railway Station'],
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Cultural gateway of South India with bustling IT hubs, Marina Beach, and vibrant art heritage.'
  },
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    popularPickupPoints: ['Majestic KBS', 'Madiwala GoTravels Lounge', 'Silk Board', 'Electronic City', 'Hebbal'],
    popularDropPoints: ['Electronic City', 'Silk Board', 'Madiwala', 'Majestic KBS', 'Yeshwantpur'],
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    description: 'The Garden City and India\'s premier technology capital, known for cool weather and vibrant parks.'
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    popularPickupPoints: ['Ameerpet', 'Mehdipatnam', 'Aramghar', 'Shamshabad', 'KPHB Colony', 'Lakdi-ka-pul'],
    popularDropPoints: ['Shamshabad', 'Aramghar', 'Mehdipatnam', 'Lakdi-ka-pul', 'Ameerpet'],
    imageUrl: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80',
    description: 'The City of Pearls, famous for historical Charminar, delectable Biryani, and HITEC City.'
  },
  {
    name: 'Madurai',
    state: 'Tamil Nadu',
    popularPickupPoints: ['Mattuthavani Bus Terminus', 'Periyar Bus Stand', 'Samayanallur Toll', 'Arapalayam'],
    popularDropPoints: ['Samayanallur', 'Periyar Bus Stand', 'Mattuthavani Integrated Terminus'],
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    description: 'The historic Temple City on the banks of Vaigai river, home to the magnificent Meenakshi Amman Temple.'
  },
  {
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    popularPickupPoints: ['Gandhipuram Omni Stand', 'Lakshmi Mills', 'Hopes College', 'Singanallur', 'Ukkadam'],
    popularDropPoints: ['Hopes College', 'Lakshmi Mills', 'Gandhipuram Omni Bus Stand'],
    imageUrl: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80',
    description: 'The Manchester of South India, pleasant foothills of the Nilgiris and thriving entrepreneurship.'
  },
  {
    name: 'Kochi',
    state: 'Kerala',
    popularPickupPoints: ['Vyttila Mobility Hub', 'Edappally Toll', 'Aluva Bypass', 'Kalamassery', 'Palarivattom'],
    popularDropPoints: ['Aluva Bypass', 'Edappally Toll', 'Vyttila Mobility Hub', 'Ernakulam South'],
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Queen of the Arabian Sea, renowned for historic Fort Kochi, Chinese fishing nets, and scenic backwaters.'
  },
  {
    name: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    popularPickupPoints: ['Central Bus Stand', 'Chatram Bus Stand', 'Tiruchirappalli Tollgate', 'Palpannai'],
    popularDropPoints: ['Samayapuram Toll', 'Tiruchirappalli Tollgate', 'Central Bus Stand'],
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443b746?auto=format&fit=crop&w=800&q=80',
    description: 'Centrally located historic city famous for the Rockfort Temple, Srirangam, and Kaveri riverfront.'
  }
];

export const COMPANY_INFO = {
  name: 'GoTravels India Private Limited',
  tagline: 'Your Journey, Our Priority.',
  tollFree: '1800-419-8899',
  supportEmail: 'care@gotravels.com',
  corporateAddress: 'GoTravels Towers, 4th Floor, GST Road, Guindy, Chennai - 600032, Tamil Nadu, India',
  gstin: '33AABCG1234F1Z8',
  operatingHours: '24 Hours / 7 Days a Week'
};
