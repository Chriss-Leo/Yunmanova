import * as migration_20260808_185556 from './20260808_185556'
import * as migration_20260810_013000_repair_marketing_blocks from './20260810_013000_repair_marketing_blocks'
import * as migration_20260813_034518_site_settings_global from './20260813_034518_site_settings_global'

export const migrations = [
  {
    up: migration_20260808_185556.up,
    down: migration_20260808_185556.down,
    name: '20260808_185556',
  },
  {
    up: migration_20260810_013000_repair_marketing_blocks.up,
    down: migration_20260810_013000_repair_marketing_blocks.down,
    name: '20260810_013000_repair_marketing_blocks',
  },
  {
    up: migration_20260813_034518_site_settings_global.up,
    down: migration_20260813_034518_site_settings_global.down,
    name: '20260813_034518_site_settings_global',
  },
]
