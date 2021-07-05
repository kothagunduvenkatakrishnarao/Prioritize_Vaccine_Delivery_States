from apscheduler.schedulers.background import BackgroundScheduler

from Server.views import RankingViewSet
def start():
    scheduler = BackgroundScheduler()
    ranking = RankingViewSet()
    scheduler.add_job(ranking.Ml_Model,"cron",hour=9,minute=28,id="ranking_001",replace_existing=True)
    scheduler.start()
