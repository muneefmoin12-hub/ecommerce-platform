import { Entity, Column, ManyToMany, ManyToOne, OneToMany, Index } from 'typeorm';
import { TimestampedEntity } from './base.entity';
import { Product } from './product.entity';

@Entity('categories')
@Index(['slug'], { unique: true })
export class Category extends TimestampedEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string | null;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string | null;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true })
  parent: Category | null;

  @OneToMany(() => Category, (cat) => cat.parent)
  children: Category[];

  @ManyToMany(() => Product, (p) => p.categories)
  products: Product[];
}
