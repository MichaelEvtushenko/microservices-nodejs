import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TopicRevision } from './topic-revision.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // authorId: string;

  @Column('text')
  title: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(type => TopicRevision, { eager: true })
  @JoinColumn()
  latestRevision: TopicRevision;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
