export interface ConsumableTypeDto {
  id: string;
  name: ConsumableType;
  daysUsageLimit?: number;
  distanceUsageLimit?: number;
}

export interface ConsumableTypeData {
  id: string;
  name: ConsumableType;
  daysUsageLimit?: number;
  distanceUsageLimit?: number;
}

export enum ConsumableType {
  ENGINE_OIL_AND_OIL_FILTER = 'ENGINE_OIL_AND_OIL_FILTER',
  AIR_FILTER = 'AIR_FILTER',
  FUEL_FILTER = 'FUEL_FILTER',
  BATTERY = 'BATTERY',
  FREON = 'FREON',
  BRAKE_PADS_AND_DISCS = 'BRAKE_PADS_AND_DISCS',
  TRANSMISSION_OIL = 'TRANSMISSION_OIL',
  SERVO_LIQUID = 'SERVO_LIQUID',
  CLUTCH_KIT = 'CLUTCH_KIT',
  DISTRIBUTION_KIT = 'DISTRIBUTION_KIT',
  SERPETINE_BELT = 'SERPETINE_BELT',
  WATER_PUMP = 'WATER_PUMP',
  SUSPENSIONS = 'SUSPENSIONS',
  GEARBOX_OIL = 'GEARBOX_OIL',
  SPARK_PLUGS = 'SPARK_PLUGS',
  ANTIFREEZE = 'ANTIFREEZE',
  MEDICINE_KIT = 'MEDICINE_KIT',
  EXTINGUISHER = 'EXTINGUISHER',
}

export const CONSUMABLE_TYPES: ConsumableTypeData[] = [
  {
    id: '2',
    name: ConsumableType.AIR_FILTER,
    distanceUsageLimit: 15000,
    daysUsageLimit: 0,
  },
  {
    id: '3',
    name: ConsumableType.FUEL_FILTER,
    distanceUsageLimit: 15000,
    daysUsageLimit: 0,
  },
  {
    id: '4',
    name: ConsumableType.BATTERY,
    distanceUsageLimit: 0,
    daysUsageLimit: 365 * 5,
  },
  {
    id: '5',
    name: ConsumableType.FREON,
    distanceUsageLimit: 60000,
    daysUsageLimit: 0,
  },
  {
    id: '6',
    name: ConsumableType.BRAKE_PADS_AND_DISCS,
    distanceUsageLimit: 60000,
    daysUsageLimit: 0,
  },
  {
    id: '7',
    name: ConsumableType.TRANSMISSION_OIL,
    distanceUsageLimit: 100000,
    daysUsageLimit: 365 * 5,
  },
  {
    id: '8',
    name: ConsumableType.SERVO_LIQUID,
    distanceUsageLimit: 60000,
    daysUsageLimit: 0,
  },
  {
    id: '9',
    name: ConsumableType.CLUTCH_KIT,
    distanceUsageLimit: 250000,
    daysUsageLimit: 0,
  },
  {
    id: '10',
    name: ConsumableType.DISTRIBUTION_KIT,
    distanceUsageLimit: 100000,
    daysUsageLimit: 0,
  },
  {
    id: '11',
    name: ConsumableType.ENGINE_OIL_AND_OIL_FILTER,
    distanceUsageLimit: 15000,
    daysUsageLimit: 0,
  },
  {
    id: '12',
    name: ConsumableType.SERPETINE_BELT,
    distanceUsageLimit: 100000,
    daysUsageLimit: 0,
  },
  {
    id: '13',
    name: ConsumableType.WATER_PUMP,
    distanceUsageLimit: 100000,
    daysUsageLimit: 0,
  },
  {
    id: '14',
    name: ConsumableType.SUSPENSIONS,
    distanceUsageLimit: 80000,
    daysUsageLimit: 0,
  },
  {
    id: '15',
    name: ConsumableType.GEARBOX_OIL,
    distanceUsageLimit: 0,
    daysUsageLimit: 365 * 5,
  },
  {
    id: '16',
    name: ConsumableType.SPARK_PLUGS,
    distanceUsageLimit: 30000,
    daysUsageLimit: 0,
  },
  {
    id: '17',
    name: ConsumableType.ANTIFREEZE,
    distanceUsageLimit: 0,
    daysUsageLimit: 365 * 3,
  },
  {
    id: '18',
    name: ConsumableType.MEDICINE_KIT,
    distanceUsageLimit: 0,
    daysUsageLimit: 365 * 5,
  },
  {
    id: '19',
    name: ConsumableType.EXTINGUISHER,
    distanceUsageLimit: 0,
    daysUsageLimit: 365 * 5,
  },
];
