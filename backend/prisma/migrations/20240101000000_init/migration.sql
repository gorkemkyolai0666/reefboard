-- CreateEnum
CREATE TYPE "CertLevel" AS ENUM ('open_water', 'advanced_open_water', 'rescue_diver', 'divemaster', 'instructor', 'none');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('active', 'graduated', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('open_water', 'advanced_open_water', 'rescue_diver', 'divemaster', 'specialty_nitrox', 'specialty_deep', 'specialty_wreck', 'specialty_night', 'specialty_underwater_photo', 'first_aid', 'try_dive');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('enrolled', 'completed', 'dropped', 'failed');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('poor', 'fair', 'good', 'excellent');

-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('bcd', 'regulator', 'wetsuit', 'drysuit', 'mask', 'fins', 'tank', 'computer', 'torch', 'camera', 'weight_belt', 'snorkel');

-- CreateEnum
CREATE TYPE "EquipmentCondition" AS ENUM ('excellent', 'good', 'fair', 'needs_service', 'out_of_service');

-- CreateTable
CREATE TABLE "Center" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "district" TEXT NOT NULL DEFAULT '',
    "maxDepth" INTEGER NOT NULL DEFAULT 40,
    "certBody" TEXT NOT NULL DEFAULT 'PADI',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Istanbul',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Center_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'instructor',
    "centerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "birthDate" TIMESTAMP(3),
    "certLevel" "CertLevel" NOT NULL DEFAULT 'none',
    "certNumber" TEXT,
    "healthClearance" BOOLEAN NOT NULL DEFAULT false,
    "status" "StudentStatus" NOT NULL DEFAULT 'active',
    "totalDives" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "centerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "courseType" "CourseType" NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'scheduled',
    "instructorName" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL DEFAULT 6,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "notes" TEXT,
    "centerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'enrolled',
    "grade" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiveLog" (
    "id" TEXT NOT NULL,
    "diveNumber" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "diveSite" TEXT NOT NULL,
    "diveDate" TIMESTAMP(3) NOT NULL,
    "maxDepth" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "waterTemp" DOUBLE PRECISION,
    "visibility" "Visibility" NOT NULL DEFAULT 'good',
    "buddy" TEXT,
    "notes" TEXT,
    "centerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DiveLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "equipmentType" "EquipmentType" NOT NULL,
    "serialNumber" TEXT,
    "brand" TEXT,
    "condition" "EquipmentCondition" NOT NULL DEFAULT 'good',
    "purchaseDate" TIMESTAMP(3),
    "lastServiceDate" TIMESTAMP(3),
    "nextServiceDate" TIMESTAMP(3),
    "isRental" BOOLEAN NOT NULL DEFAULT true,
    "dailyRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "centerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_studentId_courseId_key" ON "Enrollment"("studentId", "courseId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiveLog" ADD CONSTRAINT "DiveLog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiveLog" ADD CONSTRAINT "DiveLog_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
