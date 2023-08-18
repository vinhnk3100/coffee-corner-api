import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Comment } from './comment.schema';

export type CafeDocument = HydratedDocument<Cafe>;
export type CafeTypeDocument = HydratedDocument<CafeType>;

// =========================== Cafe Type Schema
@Schema()
export class CafeType {
  @Prop({ required: true })
  type: string;

  @Prop()
  type_description: string;
}

export const CafeTypeSchema = SchemaFactory.createForClass(CafeType);
// ========================= End Cafe Type Schema Section

@Schema({ _id: false })
class CafeLocation {
  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  address: string;
}

@Schema({ _id: false })
class CafePrice {
  @Prop()
  start: string;

  @Prop()
  to: string;
}

// ============================= Opening Closing Time
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

@Schema({ _id: false })
class CafeOpeningTime {
  @Prop()
  opening_day: string;

  @Prop()
  opening: OpenHour;

  @Prop()
  closing: CloseHour;
}
// ============================ End Opening Closing Time

// ============================ Coffe Current Event

@Schema({ _id: false })
class EventDate {
  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;
}
@Schema({ _id: false })
class CafeCurrentEvent {
  @Prop()
  onDiscountPercent: number;

  @Prop()
  event_content: string;

  @Prop()
  event_date: EventDate;
}
// =========================== End Cafe Current Event Section

@Schema({ timestamps: true })
export class Cafe {
  @Prop()
  cafe_name: string;

  @Prop()
  cafe_description: string;

  @Prop()
  cafe_image: string[];

  @Prop()
  cafe_location: CafeLocation;

  @Prop()
  cafe_price: CafePrice;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
  })
  cafe_owner: User;

  @Prop()
  thumb_up: User[];

  @Prop()
  open_time: CafeOpeningTime;

  @Prop({ required: true })
  status_open: number;

  @Prop({ required: true })
  admin_approval: number;

  @Prop()
  current_event: CafeCurrentEvent;

  @Prop({
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'CafeType',
    default: 'Normal Cafe',
    immutable: true,
  })
  cafe_type: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
  })
  comments: Comment[];
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
