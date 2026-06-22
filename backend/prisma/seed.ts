import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CENTER_ID = '00000000-0000-0000-0000-000000000001';

async function main() {
  const passwordHash = await bcrypt.hash('demo123456', 12);

  await prisma.center.upsert({
    where: { id: CENTER_ID },
    update: {},
    create: {
      id: CENTER_ID,
      name: 'Akdeniz Dalış Merkezi',
      phone: '+902425136800',
      address: 'Kaleiçi Marina, Antalya',
      city: 'Antalya',
      district: 'Muratpaşa',
      maxDepth: 45,
      certBody: 'PADI',
      latitude: 36.8841,
      longitude: 30.7056,
      timezone: 'Europe/Istanbul',
      users: {
        create: {
          email: 'demo@akdenizdalismerkezi.com.tr',
          passwordHash,
          firstName: 'Deniz',
          lastName: 'Dalgıç',
          role: 'manager',
        },
      },
    },
  });

  const studentData = [
    { id: '00000000-0000-0000-0000-000000000201', firstName: 'Elif', lastName: 'Yıldırım', email: 'elif.yildirim@mail.com', phone: '+905551234567', birthDate: new Date('1995-03-15'), certLevel: 'open_water' as const, certNumber: 'PADI-OW-2024-001', healthClearance: true, status: 'active' as const, totalDives: 12 },
    { id: '00000000-0000-0000-0000-000000000202', firstName: 'Burak', lastName: 'Özdemir', email: 'burak.ozdemir@mail.com', phone: '+905559876543', birthDate: new Date('1990-07-22'), certLevel: 'advanced_open_water' as const, certNumber: 'PADI-AOW-2024-002', healthClearance: true, status: 'active' as const, totalDives: 35 },
    { id: '00000000-0000-0000-0000-000000000203', firstName: 'Ayşe', lastName: 'Kaya', email: 'ayse.kaya@mail.com', phone: '+905557654321', birthDate: new Date('1998-11-08'), certLevel: 'none' as const, healthClearance: true, status: 'active' as const, totalDives: 0, notes: 'İlk dalış deneyimi için kayıt oldu' },
    { id: '00000000-0000-0000-0000-000000000204', firstName: 'Mehmet', lastName: 'Denizhan', email: 'mehmet.denizhan@mail.com', phone: '+905553456789', birthDate: new Date('1988-01-30'), certLevel: 'rescue_diver' as const, certNumber: 'PADI-RD-2023-015', healthClearance: true, status: 'active' as const, totalDives: 78, notes: 'Divemaster adayı' },
    { id: '00000000-0000-0000-0000-000000000205', firstName: 'Zeynep', lastName: 'Aksu', email: 'zeynep.aksu@mail.com', phone: '+905552345678', birthDate: new Date('2000-06-12'), certLevel: 'open_water' as const, certNumber: 'PADI-OW-2024-005', healthClearance: false, status: 'inactive' as const, totalDives: 6, notes: 'Sağlık raporu yenilenmeli' },
    { id: '00000000-0000-0000-0000-000000000206', firstName: 'Can', lastName: 'Türkmen', email: 'can.turkmen@mail.com', phone: '+905558765432', birthDate: new Date('1993-09-25'), certLevel: 'divemaster' as const, certNumber: 'PADI-DM-2023-008', healthClearance: true, status: 'graduated' as const, totalDives: 150 },
  ];

  for (const s of studentData) {
    await prisma.student.upsert({
      where: { id: s.id },
      update: {},
      create: { ...s, centerId: CENTER_ID },
    });
  }

  const courseData = [
    { id: '00000000-0000-0000-0000-000000000301', title: 'PADI Open Water Diver — Yaz Grubu', courseType: 'open_water' as const, status: 'in_progress' as const, instructorName: 'Deniz Dalgıç', maxParticipants: 6, price: 8500, startDate: new Date('2024-07-01'), endDate: new Date('2024-07-15'), location: 'Kaleiçi Marina — Havuz + Açık Su', notes: 'Teori + havuz + 4 açık su dalışı' },
    { id: '00000000-0000-0000-0000-000000000302', title: 'PADI Advanced Open Water', courseType: 'advanced_open_water' as const, status: 'scheduled' as const, instructorName: 'Deniz Dalgıç', maxParticipants: 4, price: 12000, startDate: new Date('2024-08-01'), endDate: new Date('2024-08-10'), location: 'Kaş — Açık Su', notes: '5 macera dalışı: derin, navigasyon, gece, batık, doğalcı' },
    { id: '00000000-0000-0000-0000-000000000303', title: 'Deneme Dalışı (Try Dive)', courseType: 'try_dive' as const, status: 'scheduled' as const, instructorName: 'Can Türkmen', maxParticipants: 8, price: 1500, startDate: new Date('2024-07-20'), endDate: new Date('2024-07-20'), location: 'Konyaaltı Sahil — Sığ Su' },
    { id: '00000000-0000-0000-0000-000000000304', title: 'PADI Rescue Diver Kursu', courseType: 'rescue_diver' as const, status: 'completed' as const, instructorName: 'Deniz Dalgıç', maxParticipants: 4, price: 15000, startDate: new Date('2024-05-01'), endDate: new Date('2024-05-20'), location: 'Antalya — Çeşitli Noktalar' },
    { id: '00000000-0000-0000-0000-000000000305', title: 'Gece Dalışı Uzmanlık Kursu', courseType: 'specialty_night' as const, status: 'scheduled' as const, instructorName: 'Deniz Dalgıç', maxParticipants: 4, price: 5000, startDate: new Date('2024-09-01'), endDate: new Date('2024-09-05'), location: 'Kaş — Limanağzı' },
  ];

  for (const c of courseData) {
    await prisma.course.upsert({
      where: { id: c.id },
      update: {},
      create: { ...c, centerId: CENTER_ID },
    });
  }

  const enrollmentData = [
    { id: '00000000-0000-0000-0000-000000000401', studentId: '00000000-0000-0000-0000-000000000203', courseId: '00000000-0000-0000-0000-000000000301', status: 'enrolled' as const },
    { id: '00000000-0000-0000-0000-000000000402', studentId: '00000000-0000-0000-0000-000000000201', courseId: '00000000-0000-0000-0000-000000000302', status: 'enrolled' as const },
    { id: '00000000-0000-0000-0000-000000000403', studentId: '00000000-0000-0000-0000-000000000202', courseId: '00000000-0000-0000-0000-000000000302', status: 'enrolled' as const },
    { id: '00000000-0000-0000-0000-000000000404', studentId: '00000000-0000-0000-0000-000000000204', courseId: '00000000-0000-0000-0000-000000000304', status: 'completed' as const, completedAt: new Date('2024-05-20'), grade: 'Başarılı' },
  ];

  for (const e of enrollmentData) {
    await prisma.enrollment.upsert({
      where: { id: e.id },
      update: {},
      create: e,
    });
  }

  const diveLogData = [
    { id: '00000000-0000-0000-0000-000000000501', diveNumber: 12, studentId: '00000000-0000-0000-0000-000000000201', diveSite: 'Kaş — Uçansu Batığı', diveDate: new Date('2024-06-28'), maxDepth: 18.5, duration: 45, waterTemp: 24, visibility: 'excellent' as const, buddy: 'Burak Özdemir', notes: 'Batık keşfi — harika görüş mesafesi' },
    { id: '00000000-0000-0000-0000-000000000502', diveNumber: 35, studentId: '00000000-0000-0000-0000-000000000202', diveSite: 'Kemer — Üç Adalar', diveDate: new Date('2024-06-25'), maxDepth: 28.3, duration: 38, waterTemp: 22, visibility: 'good' as const, buddy: 'Elif Yıldırım' },
    { id: '00000000-0000-0000-0000-000000000503', diveNumber: 78, studentId: '00000000-0000-0000-0000-000000000204', diveSite: 'Kaş — Limanağzı Mağarası', diveDate: new Date('2024-06-30'), maxDepth: 32.1, duration: 42, waterTemp: 21, visibility: 'good' as const, buddy: 'Can Türkmen', notes: 'Mağara girişi — fotoğraf çekimi yapıldı' },
    { id: '00000000-0000-0000-0000-000000000504', diveNumber: 11, studentId: '00000000-0000-0000-0000-000000000201', diveSite: 'Antalya — Konyaaltı Resifleri', diveDate: new Date('2024-06-20'), maxDepth: 12.0, duration: 55, waterTemp: 25, visibility: 'excellent' as const, buddy: 'Deniz Dalgıç' },
    { id: '00000000-0000-0000-0000-000000000505', diveNumber: 34, studentId: '00000000-0000-0000-0000-000000000202', diveSite: 'Olympos — Yanartaş Koyu', diveDate: new Date('2024-06-18'), maxDepth: 22.7, duration: 40, waterTemp: 23, visibility: 'fair' as const, notes: 'Akıntı vardı, dikkatli navigasyon gerekti' },
    { id: '00000000-0000-0000-0000-000000000506', diveNumber: 150, studentId: '00000000-0000-0000-0000-000000000206', diveSite: 'Kaş — St. Nicholas Adası', diveDate: new Date('2024-06-15'), maxDepth: 35.0, duration: 35, waterTemp: 20, visibility: 'excellent' as const, buddy: 'Deniz Dalgıç', notes: 'Derin dalış — dekompresyon sınırında' },
  ];

  for (const d of diveLogData) {
    await prisma.diveLog.upsert({
      where: { id: d.id },
      update: {},
      create: { ...d, centerId: CENTER_ID },
    });
  }

  const equipmentData = [
    { id: '00000000-0000-0000-0000-000000000601', name: 'Scubapro Hydros Pro BCD', equipmentType: 'bcd' as const, serialNumber: 'SP-BCD-2023-001', brand: 'Scubapro', condition: 'excellent' as const, purchaseDate: new Date('2023-05-01'), lastServiceDate: new Date('2024-03-01'), nextServiceDate: new Date('2024-09-01'), isRental: true, dailyRate: 150 },
    { id: '00000000-0000-0000-0000-000000000602', name: 'Aqualung Titan Regülatör', equipmentType: 'regulator' as const, serialNumber: 'AL-REG-2023-002', brand: 'Aqualung', condition: 'good' as const, purchaseDate: new Date('2023-03-15'), lastServiceDate: new Date('2024-01-15'), nextServiceDate: new Date('2024-07-15'), isRental: true, dailyRate: 120 },
    { id: '00000000-0000-0000-0000-000000000603', name: 'Mares Reef 3mm Wetsuit (M)', equipmentType: 'wetsuit' as const, serialNumber: 'MR-WS-2024-003', brand: 'Mares', condition: 'excellent' as const, purchaseDate: new Date('2024-04-01'), isRental: true, dailyRate: 80 },
    { id: '00000000-0000-0000-0000-000000000604', name: 'Suunto Zoop Novo Bilgisayar', equipmentType: 'computer' as const, serialNumber: 'SU-DC-2023-004', brand: 'Suunto', condition: 'good' as const, purchaseDate: new Date('2023-06-01'), lastServiceDate: new Date('2024-02-01'), nextServiceDate: new Date('2025-02-01'), isRental: true, dailyRate: 100 },
    { id: '00000000-0000-0000-0000-000000000605', name: 'Faber 12L Çelik Tüp', equipmentType: 'tank' as const, serialNumber: 'FB-TK-2022-005', brand: 'Faber', condition: 'needs_service' as const, purchaseDate: new Date('2022-01-01'), lastServiceDate: new Date('2023-07-01'), nextServiceDate: new Date('2024-07-01'), isRental: false, dailyRate: 0, notes: 'Hidrostatik test tarihi geçmiş — acil bakım gerekiyor' },
    { id: '00000000-0000-0000-0000-000000000606', name: 'Cressi F1 Maske', equipmentType: 'mask' as const, brand: 'Cressi', condition: 'good' as const, purchaseDate: new Date('2024-01-01'), isRental: true, dailyRate: 30 },
    { id: '00000000-0000-0000-0000-000000000607', name: 'Mares Avanti Quattro Palet', equipmentType: 'fins' as const, brand: 'Mares', condition: 'fair' as const, purchaseDate: new Date('2022-06-01'), isRental: true, dailyRate: 40, notes: 'Kayış gevşek — tamir edilecek' },
    { id: '00000000-0000-0000-0000-000000000608', name: 'BigBlue VL4200P Fener', equipmentType: 'torch' as const, serialNumber: 'BB-TH-2024-008', brand: 'BigBlue', condition: 'excellent' as const, purchaseDate: new Date('2024-05-01'), isRental: true, dailyRate: 60 },
  ];

  for (const eq of equipmentData) {
    await prisma.equipment.upsert({
      where: { id: eq.id },
      update: {},
      create: { ...eq, centerId: CENTER_ID },
    });
  }

  console.log('ReefBoard seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
