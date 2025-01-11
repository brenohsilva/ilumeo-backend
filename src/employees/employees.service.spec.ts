import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: PrismaService,
          useValue: {
            employees: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
            },
            records: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const mockCreateEmployeeDto: CreateEmployeeDto = {
        name: 'John Doe',
        code: 'EMP001',
      };
      const mockResponse = {
        id: 1,
        name: 'John Doe',
        code: 'EMP001',
        createdAt: new Date(),
      };

      jest.spyOn(prisma.employees, 'create').mockResolvedValue(mockResponse);

      const result = await service.create(mockCreateEmployeeDto);

      expect(result).toEqual(mockResponse);
      expect(prisma.employees.create).toHaveBeenCalledWith({
        data: mockCreateEmployeeDto,
      });
    });
  });

  describe('findOne', () => {
    it('should find an employee by code', async () => {
      const mockResponse = {
        id: 1,
        name: 'John Doe',
        code: 'EMP001',
        createdAt: new Date(),
      };

      jest
        .spyOn(prisma.employees, 'findUnique')
        .mockResolvedValue(mockResponse);

      const result = await service.findOne('EMP001');

      expect(result).toEqual(mockResponse);
      expect(prisma.employees.findUnique).toHaveBeenCalledWith({
        where: {
          code: 'EMP001',
        },
      });
    });
  });

  describe('findOneWithRecords', () => {
    it('should find an employee by id with records', async () => {
      const mockResponse = {
        id: 1,
        name: 'John Doe',
        code: 'EMP001',
        createdAt: new Date(),
        registers: [
          { id: 1, day: 1, month: 1, year: 2025, workedHours: 8 },
          { id: 2, day: 2, month: 1, year: 2025, workedHours: 8 },
        ],
      };

      jest.spyOn(prisma.employees, 'findFirst').mockResolvedValue(mockResponse);

      const result = await service.findOneWithRecords(1);

      expect(result).toEqual(mockResponse);
      expect(prisma.employees.findFirst).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        include: {
          registers: true,
        },
      });
    });
  });

  describe('findRecordsByMonth', () => {
    it('should find records for an employee by month and year', async () => {
      const mockResponse = [
        {
          id: 1,
          employeesId: 1,
          day: 1,
          month: 1,
          year: 2025,
          entry: new Date('2025-01-01T08:00:00.000Z'),
          lunchStart: new Date('2025-01-01T12:00:00.000Z'),
          lunchEnd: new Date('2025-01-01T13:00:00.000Z'),
          exit: new Date('2025-01-01T17:00:00.000Z'),
          workedHours: 8,
          expectedHours: 8,
          balanceHours: 0,
        },
        {
          id: 2,
          employeesId: 1,
          day: 2,
          month: 1,
          year: 2025,
          entry: new Date('2025-01-02T08:00:00.000Z'),
          lunchStart: new Date('2025-01-02T12:00:00.000Z'),
          lunchEnd: new Date('2025-01-02T13:00:00.000Z'),
          exit: new Date('2025-01-02T17:00:00.000Z'),
          workedHours: 8,
          expectedHours: 8,
          balanceHours: 0,
        },
      ];

      jest.spyOn(prisma.records, 'findMany').mockResolvedValue(mockResponse);

      const result = await service.findRecordsByMonth(1, 1, 2025);

      expect(result).toEqual(mockResponse);
      expect(prisma.records.findMany).toHaveBeenCalledWith({
        where: {
          employeesId: 1,
          month: 1,
          year: 2025,
        },
        orderBy: {
          day: 'asc',
        },
      });
    });
  });
});
