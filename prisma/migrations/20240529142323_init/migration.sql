-- CreateTable
CREATE TABLE "taxis" (
    "id" INTEGER NOT NULL,
    "plate" VARCHAR NOT NULL,

    CONSTRAINT "taxis_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trajectories" (
    "id" SERIAL NOT NULL,
    "taxi_id" INTEGER NOT NULL,
    "date" TIMESTAMPTZ(6),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "trajectories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trajectories" ADD CONSTRAINT "taxi_fk" FOREIGN KEY ("taxi_id") REFERENCES "taxis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
