import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TopicRevision {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => TopicRevision)
  @JoinColumn()
  previousRevision?: TopicRevision;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
