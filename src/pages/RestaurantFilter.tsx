import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRestaurants } from '@/data/mockRestaurantData';

const RestaurantFilter = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(mockRestaurants);

  const categories = useMemo(() => {
    const cats = ['한식', '중식', '일식', '양식', '기타'];
    return cats.map(cat => ({
      name: cat,
      count: restaurants.filter(r => r.category === cat).length,
    }));
  }, [restaurants]);

  const [activeTab, setActiveTab] = useState(categories[0].name);

  const handleToggleRestaurant = (id: number) => {
    setRestaurants(prev =>
      prev.map(r => {
        if (r.id === id) {
          const newIsFiltered = !r.isFiltered;
          let newFilteredBy = r.filteredBy ? [...r.filteredBy] : [];
          if (newIsFiltered) {
            if (!newFilteredBy.includes("머핀")) {
              newFilteredBy.push("머핀");
            }
          } else {
            newFilteredBy = newFilteredBy.filter(name => name !== "머핀");
          }
          return { ...r, isFiltered: newIsFiltered, filteredBy: newFilteredBy };
        }
        return r;
      })
    );
  };

  const currentTabIndex = categories.findIndex(c => c.name === activeTab);

  const goToNextTab = () => {
    if (currentTabIndex < categories.length - 1) {
      setActiveTab(categories[currentTabIndex + 1].name);
    } else {
      navigate(`/room/${roomId}/map`, { state: { restaurants } });
    }
  };

  const goToPrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(categories[currentTabIndex - 1].name);
    }
  };

  return (
    <div className="min-h-screen bg-primary-foreground p-4 pb-24"> {/* Add padding for footer */}
      <div className="container mx-auto max-w-md">
        <header className="my-4">
          <div className="text-center">
              <p className="text-sm text-muted-foreground">강남역 반경 500m</p>
              <h1 className="text-2xl font-bold text-primary">이 중에서 오늘 안 땡기는 곳은?</h1>
              <p className="text-muted-foreground mt-1">주변 식당에서 제외할 곳을 선택해주세요.</p>
          </div>
          {/* Progress indicator could go here */}
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-secondary/50 rounded-full">
            {categories.map(cat => (
              <TabsTrigger key={cat.name} value={cat.name} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
                {cat.name} ({cat.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => (
            <TabsContent key={cat.name} value={cat.name}>
              <div className="space-y-2 mt-4">
                {restaurants
                  .filter(r => r.category === cat.name)
                  .map(r => (
                    <Card 
                      key={r.id} 
                      onClick={() => handleToggleRestaurant(r.id)}
                      className={`cursor-pointer transition-all duration-200 border-2 ${r.isFiltered ? 'border-dashed bg-muted/50 border-destructive' : 'bg-card border-secondary'}`}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div>
                          <p className={`font-semibold text-primary ${r.isFiltered ? 'line-through' : ''}`}>{r.name}</p>
                          <p className="text-sm text-muted-foreground">
                            도보 {r.walkTime}분 · {r.priceRange === 1 ? '₩' : r.priceRange === 2 ? '₩₩' : '₩₩₩'} · {r.isOpen}
                          </p>
                        </div>
                        {r.isFiltered && <span className="text-2xl">❌</span>}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-primary-foreground border-t-2 border-secondary p-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={goToPrevTab} disabled={currentTabIndex === 0} className="border-primary text-primary hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" /> 이전
            </Button>
            <Button variant="ghost" onClick={goToNextTab} className="text-primary hover:bg-primary/10">
              건너뛰기 <SkipForward className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={goToNextTab} className="bg-primary text-primary-foreground hover:bg-primary/90">
              다음 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RestaurantFilter;