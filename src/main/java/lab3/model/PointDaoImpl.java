package lab3.model;


import org.hibernate.Session;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import java.util.List;

public class PointDaoImpl implements PointDao {
    @PersistenceContext(unitName = "PointEntity")
    private EntityManager entityManager;
    @Inject
    private UserTransaction transaction;


    @Override
    public void save(Point point) {
        try {
            transaction.begin();
            entityManager.persist(point);
            entityManager.flush();
            transaction.commit();
        } catch (Exception e) {
            try {
                transaction.rollback();
            } catch (SystemException ignored) {
            }
        }
    }

    @Override
    public List<Point> getAll() {
        Session session = entityManager.unwrap(Session.class);
        CriteriaBuilder builder = session.getCriteriaBuilder();
        CriteriaQuery<Point> criteria = builder.createQuery(Point.class);
        criteria.from(Point.class);
        return session.createQuery(criteria).getResultList();
    }
}
