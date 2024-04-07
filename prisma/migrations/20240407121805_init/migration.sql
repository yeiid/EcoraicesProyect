-- CreateTable
CREATE TABLE "Especie" (
    "id" SERIAL NOT NULL,
    "createId" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "especie" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "ciudadano" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Especie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Especie_latitud_longitud_key" ON "Especie"("latitud", "longitud");
