import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class AbstractEntity {
  @ApiProperty({ description: 'Created Time' })
  @Expose()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated Time' })
  @Expose()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty({ description: 'Deleted Time' })
  @ApiHideProperty()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}

export class PageInfoType {
  @Expose()
  limit: number;

  @Expose()
  offset: number;

  @Expose()
  total: number;
}

export abstract class KeyValue {
  @Expose()
  key: string;

  @Expose()
  value: string;
}

export abstract class Collection<T> {
  data: T[];

  @Expose()
  pageInfo: PageInfoType;
}

export class PaginationQuery {
  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  @IsInt()
  readonly offset: number = 0;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @IsPositive()
  @Max(Number.MAX_SAFE_INTEGER)
  @IsInt()
  readonly limit: number = 20;
}
