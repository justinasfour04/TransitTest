import csv
import time

LOCATION = 'GTFS/' # Change to the directory name where GTFS files located

## Get all stop ids that correspond to Grand Central
def findGrandCentralStopIds():
    grandCentralStopIds = set()
    ## Read stops file and collect all Grand Central stop ids
    with open('{0}stops.txt'.format(LOCATION)) as stopsFile:
        reader = csv.DictReader(stopsFile)
        for row in reader:
            if 'Grand Central' in row['stop_name']:
                grandCentralStopIds.add(row['stop_id'])

    return grandCentralStopIds

## Get list of unique trips through Grand Central
def getTripsThroughGrandCentral():
    routesThroughGrandCentral = set() # To keep track of unique trips
    tripIdsThroughGrandCentral = set()
    grandCentralStopIds = findGrandCentralStopIds()
    with open('{0}stop_times.txt'.format(LOCATION)) as stopTimesFile:
        reader = csv.DictReader(stopTimesFile)
        routeThroughGrandCentral = ''
        isGrandCentralRoute = False
        grandCentralTripId = ''
        for row in reader:
            # Check to see if the route passes Grand Central
            if row['stop_id'] in grandCentralStopIds:
                grandCentralTripId = row['trip_id']
                isGrandCentralRoute = True

            stopSequence = int(row['stop_sequence'])
            # For every new trip add route to trips through Grand Central list
            if reader.line_num > 1 and stopSequence == 1:
                if isGrandCentralRoute and routeThroughGrandCentral not in routesThroughGrandCentral:
                    tripIdsThroughGrandCentral.add(grandCentralTripId)
                    routesThroughGrandCentral.add(routeThroughGrandCentral)
                
                routeThroughGrandCentral = '' # Reset route
                isGrandCentralRoute = False # Reset check
                    
            routeThroughGrandCentral += row['stop_id']

    return tripIdsThroughGrandCentral

def getGrandCentralRouteIds():
    tripIdsThroughGrandCentral = getTripsThroughGrandCentral()
    grandCentralRouteIds = set()
    with open('{0}trips.txt'.format(LOCATION)) as tripsFile:
        reader = csv.DictReader(tripsFile)
        for row in reader:
            tripId = row['trip_id']
            routeId = row['route_id']
            if tripId in tripIdsThroughGrandCentral:
                grandCentralRouteIds.add(routeId)
    
    return grandCentralRouteIds


if __name__ == "__main__":
    t0 = time.time()
    print(getGrandCentralRouteIds())
    t1 = time.time()
    print(t1 - t0)


    
            


        

        