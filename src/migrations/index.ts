import * as migration_20260808_185556 from './20260808_185556';
import * as migration_20260810_013000_repair_marketing_blocks from './20260810_013000_repair_marketing_blocks';

export const migrations = [
  {
    up: migration_20260808_185556.up,
    down: migration_20260808_185556.down,
    name: '20260808_185556'
  },
  {
    up: migration_20260810_013000_repair_marketing_blocks.up,
    down: migration_20260810_013000_repair_marketing_blocks.down,
    name: '20260810_013000_repair_marketing_blocks'
  },
];
