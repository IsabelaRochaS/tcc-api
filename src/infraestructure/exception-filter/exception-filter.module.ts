import { Module } from "@nestjs/common";
import { UnhandledExceptionsFilter } from "./unhandled-exceptions.filter";

@Module({
  providers: [UnhandledExceptionsFilter],
  exports: [UnhandledExceptionsFilter],
})
export class ExceptionFilterModule {}
