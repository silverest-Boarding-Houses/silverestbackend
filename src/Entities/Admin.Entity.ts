import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage: string | null; // Store the image URL or file path here

  // Additional columns and methods if necessary
}


@Entity()
export class AgentAuth{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

}