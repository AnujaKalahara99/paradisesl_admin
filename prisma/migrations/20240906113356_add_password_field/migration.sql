-- CreateTable
CREATE TABLE "Applicant" (
    "applicantId" SERIAL NOT NULL,
    "reviewedId" INTEGER,
    "applliedDate" DATE NOT NULL,
    "completedDate" DATE,
    "status" TEXT NOT NULL,
    "reasonForReeject" TEXT,
    "givenName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "martialStatus" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "passportNo" TEXT NOT NULL,
    "passportDateOfExpiry" DATE NOT NULL,
    "passportUrl" TEXT NOT NULL,
    "placeOfIssue" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileCountryCode" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "whatsappCountryCode" TEXT NOT NULL,
    "whatsappNo" TEXT NOT NULL,
    "homeAddress" TEXT NOT NULL,
    "emergencyConName" TEXT NOT NULL,
    "emergencyConCountryCode" TEXT NOT NULL,
    "emergencyConNo" TEXT NOT NULL,
    "hasVisitedBefore" BOOLEAN NOT NULL,
    "lastVisitedDate" DATE,
    "accomodationUrl" TEXT,
    "returnTicketUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "xUrl" TEXT,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "ApplicantEntity" (
    "entityId" SERIAL NOT NULL,
    "userId" INTEGER,
    "mainApplicant" INTEGER,
    "visaSubCat" TEXT,
    "countryId" TEXT,
    "purpose" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "placeOfStay" TEXT,
    "addressOfStay" TEXT,
    "cityOfStay" TEXT,
    "zipOfStay" TEXT,

    CONSTRAINT "ApplicantEntity_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "Country" (
    "countryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("countryId")
);

-- CreateTable
CREATE TABLE "CountryGroup" (
    "countryGrpId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CountryGroup_pkey" PRIMARY KEY ("countryGrpId")
);

-- CreateTable
CREATE TABLE "CountryGroupMember" (
    "countryGrpId" INTEGER NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "CountryGroupMember_pkey" PRIMARY KEY ("countryGrpId","countryId")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employeeId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "dateOfBirth" DATE NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "EntityMember" (
    "entityId" INTEGER NOT NULL,
    "applicantId" INTEGER NOT NULL,
    "relation" TEXT,

    CONSTRAINT "EntityMember_pkey" PRIMARY KEY ("entityId","applicantId")
);

-- CreateTable
CREATE TABLE "FreeVisaCountry" (
    "countryId" TEXT NOT NULL,
    "visaTypeId" TEXT NOT NULL,

    CONSTRAINT "FreeVisaCountry_pkey" PRIMARY KEY ("countryId","visaTypeId")
);

-- CreateTable
CREATE TABLE "PastTravelDetails" (
    "applicantId" INTEGER NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "visitedDate" DATE NOT NULL,
    "proofUrl" TEXT NOT NULL,
    "purpose" TEXT,

    CONSTRAINT "PastTravelDetails_pkey" PRIMARY KEY ("applicantId","destinationCountry","visitedDate")
);

-- CreateTable
CREATE TABLE "RefreshTokens" (
    "token" TEXT NOT NULL,
    "createdAt" DATE,
    "userId" INTEGER,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT,
    "contactNo" TEXT,
    "countryId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserCred" (
    "userId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userCredPrimary" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "VisaCountryGroupFee" (
    "subCatId" TEXT NOT NULL,
    "countryGrpId" INTEGER NOT NULL,
    "fee" DECIMAL(10,2),

    CONSTRAINT "VisaCountryGroupFee_pkey" PRIMARY KEY ("subCatId","countryGrpId")
);

-- CreateTable
CREATE TABLE "VisaType" (
    "visaId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "baseFee" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "multiEntryLimitDays" INTEGER,
    "period" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "extensionDetails" TEXT NOT NULL,

    CONSTRAINT "VisaType_pkey" PRIMARY KEY ("visaId")
);

-- CreateIndex
CREATE INDEX "fki_s" ON "RefreshTokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "emailUnique" ON "UserCred"("email");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_placeOfBirth_fkey" FOREIGN KEY ("placeOfBirth") REFERENCES "Country"("countryId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_placeOfIssue_fkey" FOREIGN KEY ("placeOfIssue") REFERENCES "Country"("countryId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_reviewedId_fkey" FOREIGN KEY ("reviewedId") REFERENCES "Employee"("employeeId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ApplicantEntity" ADD CONSTRAINT "ApplicantEntity_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("countryId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ApplicantEntity" ADD CONSTRAINT "ApplicantEntity_mainApplicant_fkey" FOREIGN KEY ("mainApplicant") REFERENCES "Applicant"("applicantId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ApplicantEntity" ADD CONSTRAINT "ApplicantEntity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ApplicantEntity" ADD CONSTRAINT "ApplicantEntity_visaSubCat_fkey" FOREIGN KEY ("visaSubCat") REFERENCES "VisaType"("visaId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CountryGroupMember" ADD CONSTRAINT "CountryGroupMember_countryGrpId_fkey" FOREIGN KEY ("countryGrpId") REFERENCES "CountryGroup"("countryGrpId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CountryGroupMember" ADD CONSTRAINT "CountryGroupMember_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("countryId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EntityMember" ADD CONSTRAINT "EntityMember_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("applicantId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EntityMember" ADD CONSTRAINT "EntityMember_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "ApplicantEntity"("entityId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PastTravelDetails" ADD CONSTRAINT "PastTravelDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("applicantId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PastTravelDetails" ADD CONSTRAINT "PastTravelDetails_destinationCountry_fkey" FOREIGN KEY ("destinationCountry") REFERENCES "Country"("countryId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RefreshTokens" ADD CONSTRAINT "RefreshTokens_fkey" FOREIGN KEY ("userId") REFERENCES "UserCred"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserCred"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisaCountryGroupFee" ADD CONSTRAINT "VisaCountryGroupFee_countryGrpId_fkey" FOREIGN KEY ("countryGrpId") REFERENCES "CountryGroup"("countryGrpId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisaCountryGroupFee" ADD CONSTRAINT "VisaCountryGroupFee_subCatId_fkey" FOREIGN KEY ("subCatId") REFERENCES "VisaType"("visaId") ON DELETE NO ACTION ON UPDATE NO ACTION;
