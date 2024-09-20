import mysql from 'serverless-mysql';
import { NextResponse } from 'next/server';

// Initialize the MySQL connection
const db = mysql({
  config: {
    host: 'localhost',
    port: 3306,
    database: 'task7_2',
    user: 'root',
    password: '072793',
  },
});

// POST handler for creating a new customer
export async function POST(req) {
  const body = await req.json();  // Parse the request body
  const { firstName, lastName, dateOfBirth, emailAddress, phoneNumber, address } = body;

  // Check if all required fields are present
  if (!firstName || !lastName || !dateOfBirth || !emailAddress || !phoneNumber || !address) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  try {
    // Insert the new customer into the database and let MySQL handle the CustomerID generation
    await db.query(
      `
      INSERT INTO customer (CustomerID, FirstName, LastName, DateOfBirth, EmailAddress, PhoneNumber, Address, AccountStatus, DateJoined, LoyaltyPoints) 
      VALUES (UUID(), ?, ?, ?, ?, ?, ?, 'Active', NOW(), 0)
      `,
      [firstName, lastName, dateOfBirth, emailAddress, phoneNumber, address]
    );

    await db.end();  // Close the database connection
    return NextResponse.json({ message: 'Customer added successfully!' });
  } catch (error) {
    console.error('Error inserting customer:', error);
    return NextResponse.json({ message: 'Error adding customer to the database.' }, { status: 500 });
  }
}
