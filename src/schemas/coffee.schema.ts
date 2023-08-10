import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type CoffeeDocument = HydratedDocument<Coffee>;
export type CoffeeTypeDocument = HydratedDocument<CoffeeType>;

@Schema({ timestamps: true })
export class Coffee {
  @Prop()
  coffee_name: string;

  @Prop()
  coffee_description: string;

  @Prop()
  coffee_image: string[];

  @Prop()
  coffee_location: CoffeeLocation;

  @Prop()
  coffee_price: CoffeePrice;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
  })
  coffee_owner: User;

  @Prop()
  thumb_up: User[];

  @Prop()
  open_time: CoffeeOpeningTime;

  @Prop({ required: true })
  statusOpening: boolean;

  @Prop({ required: true })
  adminApproval: boolean;

  @Prop()
  currentEvent: CoffeeCurrentEvent;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoffeeType',
    immutable: true,
    required: true,
  })
  coffee_type: CoffeeType;

  // Comment prop
  // @Prop({
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Comment',
  // })
  // comments: Comment[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);

// =========================== Coffee Type Schema
@Schema()
export class CoffeeType {
  @Prop({ required: true })
  type: string;

  @Prop()
  type_description: string;
}

export const CoffeeTypeSchema = SchemaFactory.createForClass(CoffeeType);
// ========================= End Coffee Type Schema Section

@Schema({ _id: false })
class CoffeeLocation {
  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  address: string;
}

@Schema({ _id: false })
class CoffeePrice {
  @Prop()
  start: string;

  @Prop()
  to: string;
}

// ============================= Opening Closing Time
@Schema({ _id: false })
class CoffeeOpeningTime {
  @Prop()
  openingDay: string[];

  @Prop()
  opening: OpenHour;

  @Prop()
  closing: CloseHour;
}

@Schema({ _id: false })
class OpenHour {
  @Prop()
  hour: string;

  @Prop()
  minute: string;
}

@Schema({ _id: false })
class CloseHour {
  @Prop()
  hour: string;

  @Prop()
  minute: string;
}
// ============================ End Opening Closing Time

// ============================ Coffe Current Event
@Schema({ _id: false })
class CoffeeCurrentEvent {
  @Prop()
  onDiscountPercent: number;

  @Prop()
  event_content: string;

  @Prop()
  event_date: EventDate;
}

@Schema({ _id: false })
class EventDate {
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}
// =========================== End Coffee Current Event Section
